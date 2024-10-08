import "./App.css";
//import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Sfondo from "./Components/Sfondo";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./Components/AnimatedRoutes";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "./supabaseClient";
import { useState, useEffect } from "react";

function App(props) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" providers={[]} className="w-1/2"/>;
  } else {
    return (
      <main className="h-dvh w-screen overflow-hidden">
        <Router>
          <Navbar />
          <AnimatedRoutes />
        </Router>
        <Footer session={session} />
        <Sfondo />
      </main>
    );
  }
}
export default App;
