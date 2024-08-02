import Aside from "./Aside";
import DashbordContent from "./DashbordContent";

function Admin() {
  return (
    <section className="admin-panel w-screen h-screen flex justify-center items-center bg-primary overflow-hidden">
      <div
        className="container flex gap-4"
        style={{ height: "98%", width: "98%" }}
      >
        <Aside />
        <DashbordContent />
      </div>
    </section>
  );
}

export default Admin;
