


1. Usually "Page.jsx" display the web page, 
  with function on top like: 

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
.......
};

const Dashboard = async () => {
  const data = await getTickets();
....
  } 

This will talk to the route.js, which handles the DB Crud operations, depends on what HTTP Requests like GET is called:
export async function GET(request, { params }) {
  const { id } = params;

  const foundTicket = await Ticket.findOne({ _id: id });
  return NextResponse.json({ foundTicket }, { status: 200 });
}
  
Tickets/[id]
/route.js





  













