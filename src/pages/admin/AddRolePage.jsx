import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const permissionsData = {
  "Franchises Module": [
    { label: "Create", value: "franchises:create" },
    { label: "Edit", value: "franchises:edit" },
    { label: "View", value: "franchises:view" },
    { label: "Delete", value: "franchises:delete" },
  ],
  "Permissions Module": [
    { label: "Create", value: "permissions:create" },
    { label: "Edit", value: "permissions:edit" },
    { label: "View", value: "permissions:view" },
    { label: "Delete", value: "permissions:delete" },
  ],
  "Profile Module": [
    { label: "View", value: "profile:view" },
    { label: "Edit", value: "profile:edit" },
  ],
  "Roles Module": [
    { label: "Create", value: "roles:create" },
    { label: "Edit", value: "roles:edit" },
    { label: "View", value: "roles:view" },
    { label: "Delete", value: "roles:delete" },
  ],
  "Users Module": [
    { label: "Create", value: "users:create" },
    { label: "Edit", value: "users:edit" },
    { label: "View", value: "users:view" },
    { label: "Delete", value: "users:delete" },
  ],
  "User Roles Module": [{ label: "Assign", value: "user_roles:assign" }],
};

export default function AddRolePage() {
  const navigate = useNavigate();

  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // 🔹 styles (same as franchise)
  const inputClass =
    "w-full bg-dashboard-bg/50 border border-border-subtle rounded-lg px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-primary transition-all";

  const labelClass =
    "text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1.5 block ml-1";

  // 🔹 all permissions list
  const allPermissions = Object.values(permissionsData)
    .flat()
    .map((p) => p.value);

  const isAllSelected = selectedPermissions.length === allPermissions.length;

  // 🔹 toggle single
  const togglePermission = (value) => {
    setSelectedPermissions((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value],
    );
  };

  // 🔹 toggle module
  const toggleModule = (perms) => {
    const values = perms.map((p) => p.value);

    const allSelected = values.every((v) => selectedPermissions.includes(v));

    if (allSelected) {
      setSelectedPermissions((prev) => prev.filter((p) => !values.includes(p)));
    } else {
      setSelectedPermissions((prev) => [...new Set([...prev, ...values])]);
    }
  };

  // 🔹 toggle all
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedPermissions([]);
    } else {
      setSelectedPermissions(allPermissions);
    }
  };

  const handleSubmit = () => {
    console.log({
      roleName,
      permissions: selectedPermissions,
    });
  };

  return (
    <div className="space-y-6 pb-20 p-4 max-w-7xl mx-auto">
      {/* 🔥 HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-text-main uppercase tracking-tight">
          Role Management
        </h1>

        <p className="text-sm text-primary mt-1 font-medium">
          Dashboard
          <span className="mx-2 text-text-muted">&gt;&gt;</span>
          Admin Settings
          <span className="mx-2 text-text-muted">&gt;&gt;</span>
          Roles
          <span className="mx-2 text-text-muted">&gt;&gt;</span>
          Add Role
        </p>
      </div>

      {/* 🔥 MAIN CARD */}
      <Card className="bg-card-bg border-border-subtle shadow-xl rounded-3xl">
        <CardContent className="p-6 md:p-8 space-y-6">
          {/* Role Name */}
          <div className="max-w-md">
            <label className={labelClass}>Role Name*</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Enter role name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>

          {/* 🔥 Permissions Header (RIGHT SIDE SELECT ALL) */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <h2 className="font-bold text-text-main text-lg">Permissions</h2>

            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted">Select All</span>
              <input
                type="checkbox"
                className="w-4 h-4 accent-primary"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </div>
          </div>

          {/* 🔥 MODULE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(permissionsData).map(([module, perms]) => (
              <div
                key={module}
                className="bg-dashboard-bg/40 border border-border-subtle rounded-2xl p-5"
              >
                {/* Module Header */}
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted">
                    {module}
                  </h4>

                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-primary"
                    onChange={() => toggleModule(perms)}
                    checked={perms
                      .map((p) => p.value)
                      .every((v) => selectedPermissions.includes(v))}
                  />
                </div>

                {/* Permissions */}
                <div className="space-y-3">
                  {perms.map((perm) => (
                    <label
                      key={perm.value}
                      className="flex items-center gap-3 text-sm text-text-main"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-primary"
                        checked={selectedPermissions.includes(perm.value)}
                        onChange={() => togglePermission(perm.value)}
                      />
                      {perm.label}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 🔥 FOOTER */}
          <div className="flex justify-end gap-4 pt-6 border-t border-border-subtle">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard/admin/roles")}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              className="bg-primary text-black hover:bg-primary/90"
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
