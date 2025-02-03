import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Elements
import BackToTop from "./elements/back-top";
import PageScrollTop from "./elements/page-scroll-top";

// All Pages Router
import Index from "./pages/index";
import SignUp from "./pages/sign-up";
import VerifyOtp from "./pages/verify-otp";
import AboutUs from "./pages/about-us";
import Team from "./pages/team";
import Services from "./pages/services";
import ServiceDetail from "./pages/service-detail";
import FormLogin from "./pages/login";
import FormRegister from "./pages/form-register";
import FormForgetPassword from "./pages/form-forget-password";
import Faq from "./pages/faq";
import ContactUs from "./pages/contact-us";
import BookConsultant from "./pages/book-consultant";
import BlogGrid from "./pages/blog-grid";
import BlogDetails from "./pages/blog-details";
import Error from "./pages/error-404";
import ServiceProviders from "./pages/service-providers";
import BookAppontment from "./pages/book-appontment";
import Admin from "./pages/admin/admin";
import AddCategories from "./pages/admin/add-categories";
import AddServices from "./pages/admin/add-services";
import AddCities from "./pages/admin/add-city";
import AddPeople from "./pages/admin/add-people";
// import AllServices from "./pages/admin/all-services";
import AddServiceProvider from "./pages/admin/add-service-provider";
import PrivateRoute from "./pages/private-route";

const Markup = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Index} />
          <PrivateRoute path="/admin" exact component={Admin} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/sign-up/verify" exact component={VerifyOtp} />
          <Route path="/about-us" exact component={AboutUs} />
          <Route path="/team" exact component={Team} />
          <Route path="/services" exact component={Services} />
          <PrivateRoute
            path="/service-detail/:categoryRef"
            exact
            component={ServiceDetail}
          />
          <Route path="/login" exact component={FormLogin} />
          <Route path="/form-register" exact component={FormRegister} />
          <Route
            path="/form-forget-password"
            exact
            component={FormForgetPassword}
          />
          <PrivateRoute
            path="/serviceProviders/:serviceRef"
            exact
            component={ServiceProviders}
          />
          <PrivateRoute
            path="/book-appointment"
            exact
            component={BookAppontment}
          />
          <Route path="/faq" exact component={Faq} />
          <Route path="/contact-us" exact component={ContactUs} />
          <Route path="/book-consultant" exact component={BookConsultant} />
          <Route path="/blog-grid" exact component={BlogGrid} />
          <Route path="/blog-details" exact component={BlogDetails} />

          {/* services */}
          <Route path="/service/hospital" exact component={ServiceDetail} />
          <Route path="/service/medical" exact component={ServiceDetail} />
          <Route
            path="/service/pathological-laboratories"
            exact
            component={ServiceDetail}
          />
          <Route path="/service/ambulance" exact component={ServiceDetail} />
          <Route path="/service/blood-banks" exact component={ServiceDetail} />

          {/* Admin: Add sections */}
          <PrivateRoute path="/admin" exact component={Admin} />
          <PrivateRoute
            path="/admin/add-category"
            exact
            component={AddCategories}
          />
          <PrivateRoute
            path="/admin/add-service"
            exact
            component={AddServices}
          />
          <PrivateRoute path="/admin/add-city" exact component={AddCities} />
          <PrivateRoute path="/admin/add-people" exact component={AddPeople} />
          <PrivateRoute
            path="/admin/add-hospital"
            exact
            component={AddServiceProvider}
          />

          {/* Admin: Get list of service*/}
          {/* <PrivateRoute
            path="/admin/all-services/:categoryRef"
            exact
            component={AllServices}
          /> */}
          <Route component={Error} />
        </Switch>
        <PageScrollTop />
      </BrowserRouter>
      <BackToTop />
    </>
  );
};

export default Markup;
