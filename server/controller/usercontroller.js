// Import necessary modules and dependencies

function Admin() {
    const [cars, setCars] = useState([]);
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      fetchCars();
      fetchUsers();
    }, []);
  
    
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        console.log(response.data);
        if (response.data && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          console.error('Data is not in the expected format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    return (
      <div>
        {/* Your existing JSX code */}
        <div className='table-container'>
          <table className="submitted-data-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  {/* Add more columns as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  export default Admin;
  