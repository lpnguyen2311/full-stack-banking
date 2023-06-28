import Card from '../components/Card'


export default function Home(){
  return (
    <Card
      bgcolor="primary"
      txtcolor="light"
      header="Home"
      title="Welcome to BadBank"
      text={<p><i>For All Your Banking Needs.</i><br></br>Use the NavBar to navigate to the function you would like to use</p>}
      body={(<img src="bank.png" className="img-fluid" alt="bank"/>)}
    />    
  );  
}