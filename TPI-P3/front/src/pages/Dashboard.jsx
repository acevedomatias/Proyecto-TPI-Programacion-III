import CustomNavbar from "../components/CustomNavbar ";

export const Dashboard = ( {userRole }) => {
  return (
    <div>
      <CustomNavbar userRole={ userRole }/>

      <section id="cabañas" style={{height:'100vh'}}>
        <h2>cabañas</h2>
      </section>

      <section id="conocenos" style={{height:'100vh'}}>
        <h2>conocenos</h2>
      </section>

      <section id="contacto" style={{height:'100vh'}}>
        <h2>contacto</h2>
      </section>
    </div>
  )
}

export default Dashboard;