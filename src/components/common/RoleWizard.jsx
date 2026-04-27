import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import toast from "react-hot-toast";
import { RotateCcw } from "lucide-react";

import { createRole, updateRole } from "../../redux/roleSlice";
import { fetchRoleByIdApi } from "../../services/apiCalls";
import { fetchPermissions } from "../../redux/permissionSlice";

export default function RoleWizard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const isEdit = Boolean(id);

  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [errors, setErrors] = useState({});

  const { items: permissions } = useSelector((state) => state.permissions);

  // Fetch role (EDIT)
  useEffect(() => {
    if (isEdit) {
      const fetchRole = async () => {
        try {
          const res = await fetchRoleByIdApi(id);
          setRoleName(res.name || "");
          setSelectedPermissions(
            (res.permissions || []).map((p) =>
              typeof p === "string" ? p : p.code,
            ),
          );
        } catch (err) {
          console.error("Failed to fetch role");
        }
      };

      fetchRole();
    }
  }, [id, isEdit]);

  // FETCH PERMISSIONS
  useEffect(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  const inputClass =
    "w-full bg-dashboard-bg/50 border border-border-subtle rounded-lg px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-primary transition-all";

  const labelClass =
    "text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1.5 block ml-1";

  // TRANSFORM API → UI FORMAT
  const permissionsData = permissions.reduce((acc, perm) => {
    const moduleName =
      perm.module.charAt(0).toUpperCase() + perm.module.slice(1) + " Module";

    if (!acc[moduleName]) acc[moduleName] = [];

    acc[moduleName].push({
      label: perm.action.charAt(0).toUpperCase() + perm.action.slice(1),
      value: perm.code,
    });

    return acc;
  }, {});

  const allPermissions = Object.values(permissionsData)
    .flat()
    .map((p) => p.value);

  const isAllSelected = selectedPermissions.length === allPermissions.length;

  const togglePermission = (value) => {
    setSelectedPermissions((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value],
    );
  };

  const toggleModule = (perms) => {
    const values = perms.map((p) => p.value);

    const allSelected = values.every((v) => selectedPermissions.includes(v));

    if (allSelected) {
      setSelectedPermissions((prev) => prev.filter((p) => !values.includes(p)));
    } else {
      setSelectedPermissions((prev) => [...new Set([...prev, ...values])]);
    }
  };

  const handleSelectAll = () => {
    setSelectedPermissions(isAllSelected ? [] : allPermissions);
  };

  // Submit (CREATE / UPDATE)
  const handleSubmit = async () => {
    const newErrors = {};

    if (!roleName.trim()) {
      newErrors.roleName = "Role name is required";
    } else if (roleName.trim().length < 3) {
      newErrors.roleName = "Minimum 3 characters required";
    }

    if (!selectedPermissions.length) {
      newErrors.permissions = "Select at least one permission";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix validation errors");
      return;
    }

    const payload = {
      name: roleName.trim(),
      permission_codes: selectedPermissions,
    };

    const promise = isEdit
      ? dispatch(updateRole({ id, data: payload })).unwrap()
      : dispatch(createRole(payload)).unwrap();

    toast.promise(promise, {
      loading: isEdit ? "Updating role..." : "Creating role...",
      success: isEdit
        ? "Role updated successfully"
        : "Role created successfully",
      error: "Failed to save role",
    });

    try {
      await promise;
      navigate("/dashboard/admin/roles");
    } catch (err) {}
  };

  return (
    <div className="space-y-6 pb-20 p-4 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main uppercase">
            Role Management
          </h1>

          <p className="text-sm text-primary mt-1 font-medium">
            Dashboard &gt;&gt; Admin Settings &gt;&gt; Roles &gt;&gt;{" "}
            {isEdit ? "Edit Role" : "Add Role"}
          </p>
        </div>

        <Button
          onClick={() => navigate("/dashboard/admin/roles")}
          variant="outline"
          className="h-10 rounded-xl border-slate-300 dark:border-border-subtle text-text-main"
        >
          <RotateCcw size={16} className="mr-2" /> Discard
        </Button>
      </div>

      <Card className="bg-card-bg border-border-subtle rounded-3xl">
        <CardContent className="p-6 space-y-6">
          {/* Role Name */}
          <div className="max-w-md">
            <label className={labelClass}>Role Name*</label>
            <input
              type="text"
              className={`${inputClass} ${
                errors.roleName ? "border-red-500 focus:border-red-500" : ""
              }`}
              value={roleName}
              onChange={(e) => {
                setRoleName(e.target.value);
                setErrors((prev) => ({ ...prev, roleName: "" }));
              }}
            />

            {errors.roleName && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                {errors.roleName}
              </p>
            )}
          </div>

          {/* Permissions Header */}
          <div className="flex justify-between border-b border-border-subtle pb-3">
            <h2 className="font-bold text-lg text-text-main">Permissions</h2>

            <div className="flex gap-2 items-center">
              <span className="text-xs text-text-muted">Select All</span>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
                className="accent-yellow-400"
              />
            </div>
          </div>

          {errors.permissions && (
            <p className="text-red-500 text-xs mt-2 font-medium">
              {errors.permissions}
            </p>
          )}

          {/* Modules */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(permissionsData).map(([module, perms]) => (
              <div
                key={module}
                className="bg-dashboard-bg/40 border border-border-subtle rounded-2xl p-5"
              >
                <div className="flex justify-between mb-4">
                  <h4 className="text-xs font-bold text-text-muted uppercase">
                    {module}
                  </h4>

                  <input
                    type="checkbox"
                    onChange={() => toggleModule(perms)}
                    checked={perms
                      .map((p) => p.value)
                      .every((v) => selectedPermissions.includes(v))}
                    className="accent-yellow-400"
                  />
                </div>

                {perms.map((perm) => (
                  <label key={perm.value} className="flex gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(perm.value)}
                      onChange={() => togglePermission(perm.value)}
                      className="accent-yellow-400"
                    />
                    {perm.label}
                  </label>
                ))}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 border-t border-border-subtle pt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard/admin/roles")}
            >
              Cancel
            </Button>

            <Button onClick={handleSubmit}>
              {isEdit ? "Update Role" : "Create Role"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
