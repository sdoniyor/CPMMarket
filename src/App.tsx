// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import AuthPage from "./pages/AuthPage";
// import ProfilePage from "./pages/ProfilePage";
// import MarketPage from "./pages/MarketPage";
// import CarDetail from "./pages/CarDetail";
// import Navbar from "./components/Navbar";

// import RequireAuth from "./components/RequireAuth";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* 🔥 DEFAULT */}
//         <Route path="/" element={<Navigate to="/auth" replace />} />

//         {/* ================= AUTH ================= */}
//         <Route path="/auth" element={<AuthPage />} />

//         {/* ================= PROTECTED ================= */}
//         <Route
//           path="/market"
//           element={
//             <RequireAuth>
//               <>
//                 <Navbar />
//                 <MarketPage />
//               </>
//             </RequireAuth>
//           }
//         />

//         <Route
//           path="/profile"
//           element={
//             <RequireAuth>
//               <>
//                 <Navbar />
//                 <ProfilePage />
//               </>
//             </RequireAuth>
//           }
//         />

//         <Route
//           path="/car/:id"
//           element={
//             <RequireAuth>
//               <>
//                 <Navbar />
//                 <CarDetail />
//               </>
//             </RequireAuth>
//           }
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }




import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import MarketPage from "./pages/MarketPage";
import CarDetail from "./pages/CarDetail";
import Navbar from "./components/Navbar";

import RequireAuth from "./components/RequireAuth";

/* ================= ADMIN ================= */
import AdminLayout from "./admin/layout/AdminLayout";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminCars from "./admin/pages/AdminCars";
import AdminPromos from "./admin/pages/AdminPromos";
import RequireAdmin from "./components/RequireAdmin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔥 DEFAULT */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* ================= AUTH ================= */}
        <Route path="/auth" element={<AuthPage />} />

        {/* ================= MARKET ================= */}
        <Route
          path="/market"
          element={
            <RequireAuth>
              <>
                <Navbar />
                <MarketPage />
              </>
            </RequireAuth>
          }
        />

        {/* ================= PROFILE ================= */}
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <>
                <Navbar />
                <ProfilePage />
              </>
            </RequireAuth>
          }
        />

        {/* ================= CAR DETAIL ================= */}
        <Route
          path="/car/:id"
          element={
            <RequireAuth>
              <>
                <Navbar />
                <CarDetail />
              </>
            </RequireAuth>
          }
        />

        {/* ================= ADMIN PANEL ================= */}
        <Route
          path="/admin/*"
          element={
            <RequireAuth>
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            </RequireAuth>
          }
        >
          <Route path="users" element={<AdminUsers />} />
          <Route path="cars" element={<AdminCars />} />
          <Route path="promos" element={<AdminPromos />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}