// import React,{useState,useEffect} from 'react'


//  const Getmetod(){

//     const [error, setError] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [items, setItems] = useState([]);
//     useEffect(() => {
//     fetch("https://610e4a9848beae001747baa4.mockapi.io/myapptodo2")
//       .then(res => res.json())
//       .then(
//         (result) => {
//           setIsLoaded(true);
//           setItems(result);
//         },
//         // Note: it's important to handle errors here
//         // instead of a catch() block so that we don't swallow
//         // exceptions from actual bugs in components.
//         (error) => {
//           setIsLoaded(true);
//           setError(error);
//         }
//       )
//   }, [])

  

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   } else if (!isLoaded) {
//     return <div>Loading...</div>;
//   } else {
//     return items;
//             }
// }
// export default Getmetod;