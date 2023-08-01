import Footer from "../Customer/Footer";
import Header from "../Customer/Header";
import NotFoundPage from "../Customer/NotFoundPage";

function NotFoundAdminPage(props) {
    return (
        <div className="root">
            <Header user={props.user}/>
            <NotFoundPage />
            <Footer />
        </div>
    )
}
export default NotFoundAdminPage;