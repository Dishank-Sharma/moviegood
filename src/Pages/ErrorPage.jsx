import "./ErrorPage.css";
import Logo from "../Components/Logo.jsx";

export default function ErrorPage() {
  return (
    <>
      <Logo/>
      <div className="errorPage">
        <div className="content">
          <h1>Expect to find something funny on our 404 page?</h1>
          <h1>Getting lost is no joke.</h1>
          <a href="/"><button>Go To Home</button></a>
        </div>
      </div>
    </>
  );
}
