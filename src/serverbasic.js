httpRequest = () =>{
    //'http://jsonplaceholder.typicode.com/posts'
    axios.get()
    .then(response => {
      console.log(response);
        // const posts = response.data.slice(0,8);
        // const updatedPosts = posts.map(p => {
        //     return {
        //         ...p,
        //         author: 'lior'
        //     }
        // })
        // this.setState({posts: updatedPosts})
    })
    .catch(error =>{
        console.log(error)
        this.setState({hasError: true})
    });
  }