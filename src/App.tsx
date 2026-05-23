
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import AuthPage from "./pages/AuthPage";
// import ProfilePage from "./pages/ProfilePage";
// import MarketPage from "./pages/MarketPage";
// import CarDetail from "./pages/CarDetail";
// import Navbar from "./components/Navbar";

// import RequireAuth from "./components/RequireAuth";

// /* ================= ADMIN ================= */
// import AdminLayout from "./admin/layout/AdminLayout";
// import AdminUsers from "./admin/pages/AdminUsers";
// import AdminCars from "./admin/pages/AdminCars";
// import AdminPromos from "./admin/pages/AdminPromos";

// import RequireAdmin from "./components/RequireAdmin";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* ================= DEFAULT ================= */}
//         <Route path="/" element={<Navigate to="/auth" replace />} />

//         {/* ================= AUTH ================= */}
//         <Route path="/auth" element={<AuthPage />} />

//         {/* ================= MARKET ================= */}
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

//         {/* ================= PROFILE ================= */}
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

//         {/* ================= CAR ================= */}
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

//         {/* ================= ADMIN PANEL ================= */}
//         <Route
//           path="/admin"
//           element={
//             <RequireAuth>
//               <RequireAdmin>
//                 <AdminLayout />
//               </RequireAdmin>
//             </RequireAuth>
//           }
//         >
//           <Route path="users" element={<AdminUsers />} />
//           <Route path="cars" element={<AdminCars />} />
//           <Route path="promos" element={<AdminPromos />} />
//         </Route>

//         {/* fallback */}
//         <Route path="*" element={<Navigate to="/auth" replace />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }




import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import MarketPage from "./pages/MarketPage";
import CarDetail from "./pages/CarDetail";
import FaqPage from "./pages/FaqPage"; 
import KingPage from "./pages/KingPage";
import DonateMarket from "./pages/DonateMarket";

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

        {/* ================= DEFAULT ================= */}
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

        {/* ================= CAR ================= */}
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

        {/* ================= FAQ ================= */}
        <Route path="/faq" element={<FaqPage />} />

        {/* ================= KING ================= */}
        <Route
          path="/king"
          element={
            <RequireAuth>
              <>
                <Navbar />
                <KingPage />
              </>
            </RequireAuth>
          }
        />

        {/* ================= DONATE ================= */}
        <Route
          path="/donate"
          element={
            <RequireAuth>
              <>
                <Navbar />
                <DonateMarket />
              </>
            </RequireAuth>
          }
        />

        {/* ================= ADMIN PANEL ================= */}
        <Route
          path="/admin"
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

        {/* fallback */}
        <Route path="*" element={<Navigate to="/auth" replace />} />

      </Routes>
    </BrowserRouter>
  );
}