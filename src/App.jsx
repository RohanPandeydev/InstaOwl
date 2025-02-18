import { Routes, Route } from "react-router-dom";
import "./App.css";
import ClassF from "./Components/ClassF";
import Subjects from "./Pages/Subject";
import Videos from "./Pages/Videos";
import Topics from "./Pages/Topics";
import Video from "./Pages/Video";
import SkeletonLoader from "./Loader/Skeleton";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import VideoDetails from "./Pages/VideoDetails";
import { RequireAuth, RequireAuthLogout } from "./Utilities/Protector";
import PageNotFound from "./Pages/PageNotFound";
import DashBoardLayout from "./Helper/DashBoard";
import RegisterDetails from "./Pages/RegisterDetails";
import Banners from "./Components/Banners";
import PremiumPlan from "./Pages/PremiumPlan";
import MySubscription from "./Pages/MySubscription";
import WatchList from "./Pages/WatchList";
import SearchResult from "./Components/SearchResult";
import BlogList from "./Pages/BlogList";
import BlogDetails from "./Pages/BlogDetails";
import Contact from "./Pages/Contact";
import WatchListBanner from "./Components/Inner-Banners/WatchListBanner";
import BlogBanner from "./Components/Inner-Banners/BlogBanner";
import ConatactBanner from "./Components/Inner-Banners/ConatactBanner";
import OnePlan from "./Pages/OnePlan";

export default function App() {

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <RequireAuthLogout>
                <DashBoardLayout banner={<Banners />}>
                  <Videos />
                </DashBoardLayout>
              </RequireAuthLogout>
            </>
          }
        />
        <Route
          path="/login"
          // element={<HLSVideoPlayer videoSource={videoSource} />}
          element={
            <RequireAuthLogout>
              <Login />
            </RequireAuthLogout>
          }
        />
        <Route
          path="/register"
          // element={<HLSVideoPlayer videoSource={videoSource} />}
          element={
            <RequireAuthLogout>
              <Register />
            </RequireAuthLogout>
          }
        />
        <Route
          path="/registerdetails"
          // element={<HLSVideoPlayer videoSource={videoSource} />}
          element={
            <RequireAuth>
              <RegisterDetails />
            </RequireAuth>
          }
        />

        <Route
          path="class"
          element={
            <>
              {" "}
              <RequireAuthLogout>
                <DashBoardLayout banner={<Banners />}>
                  <ClassF />
                </DashBoardLayout>
              </RequireAuthLogout>
            </>
          }
        />
        <Route
          path="class/:id/subject"
          element={
            <>
              {" "}
              <RequireAuthLogout>
                <DashBoardLayout banner={<Banners />}>
                  <Subjects />
                </DashBoardLayout>
              </RequireAuthLogout>
            </>
          }
        />
        <Route
          path="class/:cid/subject/:sid/topic/"
          element={
            <RequireAuthLogout>
              <DashBoardLayout banner={<Banners />}>
                {" "}
                <Topics />
              </DashBoardLayout>
            </RequireAuthLogout>
          }
        />
        {/* <Route
          path="class/subject/:id/:id/:id"
          // element={<HLSVideoPlayer videoSource={videoSource} />}
          element={
            <>
              {" "}
              <RequireAuth>
                <DashBoardLayout banner={<Banners />}>
                  <Video />
                </DashBoardLayout>
              </RequireAuth>
            </>
          }
        /> */}
        <Route
          path="class/:cid/subject/:sid/topic/:id"
          // element={<HLSVideoPlayer videoSource={videoSource} />}
          element={
            <RequireAuth>
              <DashBoardLayout >
                <VideoDetails />
              </DashBoardLayout>
            </RequireAuth>
          }
        />

        <Route
          path="/premium-plan"
          exact
          element={
            <DashBoardLayout>
              <PremiumPlan />
            </DashBoardLayout>
          }
        />

<Route
          path="/oneplan/:id"
          exact
          element={
               <RequireAuth>
            <DashBoardLayout>
              <OnePlan />
            </DashBoardLayout>
              </RequireAuth>
          }
        />
        <Route
          path="my-subscription"
          exact
          element={
            <DashBoardLayout>
              <MySubscription />
            </DashBoardLayout>
          }
        />
        <Route
          path="watchlist"
          exact
          element={
            <RequireAuth>
              <DashBoardLayout banner={<WatchListBanner />}>
                <WatchList />
              </DashBoardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="blogs"
          exact
          element={
            <RequireAuthLogout>
              <DashBoardLayout banner={<BlogBanner />}>
                <BlogList />
              </DashBoardLayout>
            </RequireAuthLogout>
          }
        />
        <Route
          path="blogs/page/:pageid"
          exact
          element={
            <RequireAuthLogout>
              <DashBoardLayout banner={<BlogBanner />}>
                <BlogList />
              </DashBoardLayout>
            </RequireAuthLogout>
          }
        />
        <Route
          path="blog/details/:slug"
          exact
          element={
            <RequireAuthLogout>
              <DashBoardLayout >
                <BlogDetails />
              </DashBoardLayout>
            </RequireAuthLogout>
          }
        />
        <Route
          path="contact"
          exact
          element={
            <RequireAuthLogout>
              <DashBoardLayout banner={<ConatactBanner />}>
                <Contact />
              </DashBoardLayout>
            </RequireAuthLogout>
          }
        />
        <Route
          path="search/:txt/:type"
          exact
          element={
            <RequireAuthLogout>
              <DashBoardLayout>

                <SearchResult />
              </DashBoardLayout>

            </RequireAuthLogout>


          }
        />
        <Route
          path="*"
          exact
          element={
            <>
              <PageNotFound />
            </>
          }
        />

      </Routes>
    </>
  );
}
