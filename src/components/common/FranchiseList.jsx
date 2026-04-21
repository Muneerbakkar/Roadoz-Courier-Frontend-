import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "../ui/card";
import { 
  Mail, Phone, Edit, Trash2, Search, RotateCcw, 
  ToggleRight, ToggleLeft, User, MapPin, Loader2 
} from "lucide-react";
import { swalConfirmDelete, swalSuccess, swalError } from "../../lib/swal";
import { getFranchises, deleteFranchise, updateFranchise } from "../../redux/franchiseSlice";
import Pagination from "../ui/Pagination";

export default function FranchiseList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading, pagination } = useSelector((state) => state.franchise);

  useEffect(() => {
    dispatch(getFranchises({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleToggleStatus = async (item) => {
    try {
      await dispatch(updateFranchise({ 
        id: item.id, 
        data: { is_active: !item.is_active } 
      })).unwrap();
      swalSuccess("Success", "Franchise status updated.");
    } catch (err) {
      swalError("Failed", "Could not update status.");
    }
  };
  
const handleDelete = async (id) => {
    const res = await swalConfirmDelete("Remove Franchise?", "All records will be permanently deleted.");
    if (res.isConfirmed) {
      try {
        // Calling the Delete API via Redux Thunk
        await dispatch(deleteFranchise(id)).unwrap();
        swalSuccess("Deleted", "Franchise removed successfully.");
      } catch (err) {
        swalError("Error", err || "Failed to delete record.");
      }
    }
  };

  return (
    <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-dashboard-bg/50 border-b border-border-subtle text-text-muted text-[11px] font-bold uppercase tracking-widest">
                <th className="px-6 py-4">Unique Code</th>
                <th className="px-6 py-4">Franchise Details</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {loading && items.length === 0 ? (
                <tr>
                   <td colSpan="4" className="py-20 text-center"><Loader2 className="animate-spin inline text-primary" size={40}/></td>
                </tr>
              ) : items.map((f) => (
                <tr key={f.id} className="hover:bg-dashboard-bg/30 transition-colors">
                  <td className="px-6 py-6 font-mono font-bold text-primary text-xs">{f.franchise_code}</td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary"><User size={14}/></div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-text-main">{f.full_name}</span>
                        <span className="text-[10px] text-text-muted flex items-center gap-1 uppercase"><MapPin size={10}/> {f.proposed_location}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <button onClick={() => handleToggleStatus(f)}>
                      {f.is_active ? <ToggleRight className="text-green-500" size={24} /> : <ToggleLeft className="text-text-muted/50" size={24} />}
                    </button>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => navigate(`/dashboard/franchise/edit/${f.id}`)} 
                        className="p-2 border border-primary/20 text-primary rounded-md hover:bg-primary hover:text-black transition-all"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(f.id)}
                        className="p-2 border border-red-500/20 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border-subtle bg-dashboard-bg/20">
            <Pagination 
                currentPage={pagination.page} 
                totalPages={pagination.pages} 
                onPageChange={(p) => dispatch(getFranchises({ page: p, limit: 10 }))}
            />
        </div>
      </CardContent>
    </Card>
  );
}