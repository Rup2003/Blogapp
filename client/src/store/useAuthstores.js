import { create } from "zustand";
import { axiosInstance } from "../api/axios";
import toast from "react-hot-toast";

export const useAuthstores = create((set) => ({
  authUser: null,
  isRegistered: false,
  isloggingin: false,
  isloggingout: false,
  isgettingProfile: false,
  hasfetchedProfile: false,

  getProfile: async () => {
    set({ isgettingProfile: true });
    try {
      const res = await axiosInstance.get("/user/profile");
      set({ authUser: res.data.data });
    } catch (error) {
      set({ authUser: null });
      toast.error(error.response.data.message || "Session expred");
    } finally {
      set({ isgettingProfile: false, hasFetchedProfile: true });
    }
  },

  loginUser: async(data) => {
    set({ isloggingin: true});
    console.log(data);
    
    try{
      const res = await axiosInstance.post("/user/login",data);
      console.log(res);
      
      set({ authUser: res.data.data });
      
      if (res.data.success) {  
        toast.success(res.data.message);
      }
    } catch(error){
      toast.error(error.response.data.message);
    } finally{
      set({isloggingin: false});
    }
  },

  registerUser: async(data)=> {
    set({isRegistered: true });
    try{
      const res = await axiosInstance.post("/user/register", data);
      set({ authUser: req.data.data});
      toast.success(res.data.message);
    } catch(error){
      toast.error(error.response.data.message);
    } finally{
      set ({ isRegistered: false });
    }
  },

  logoutUser: async() => {
    set({isloggingout: true});
    try{
      const res = await axiosInstance.get("/user/logout");
      set({ authUser: null})
      toast.success(res.data.message);
    } catch(error){
      toast.error(error.response.data.message)
    } finally{
      set({ isloggingout: false })
    }
  },
}));
