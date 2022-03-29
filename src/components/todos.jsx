
import React from "react";
import axios from "axios";
class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: [],
            quere : "",
            page:1,
            limit:10
        }
        this.hanldeChange = this.hanldeChange.bind(this)
    }

    hanldeChange (e){
        //console.log(this)
        this.setState({
            quere: e.target.value
        })
    }
    componentDidMount(){
        this.handletodos()
    }
    handletodos(){
        return(
            axios.get(`https://fake-server-anand.herokuapp.com/users?_page=${this.state.page}&_limit=${this.state.limit}`).then((res)=>{
            this.setState({
                todo:res.data
            },()=>{console.log(this.state.todo)})
        })
        )
    }

    hancleclick(){
        const {quere} = this.state;
        const payload ={
            name:quere
        }
        if(quere!==""){
        axios.post("https://fake-server-anand.herokuapp.com/users", payload).then(()=>{
            this.handletodos()
        },()=>{
            
        })
        
        }
    }
    handleDelte(id){
        axios.delete(`https://fake-server-anand.herokuapp.com/users/${id}`).then(()=>{
            this.handletodos();
        })
    }
    handlePagging(p){
        if(this.state.page>=1){
        this.setState({
            page:this.state.page + p
        },()=>{
            this.handletodos()
            console.log(this.state.page)
        })
        }
        else{
            this.setState({
                page:1
            },()=>{
                this.handletodos()
                console.log(this.state.page)
            })
        }
    }
    render() {
        const{quere, todo} = this.state
        return (
            <div>
                <h1>My Todos</h1>
                <input type="text" id="input1" placeholder="enter your todo" value={quere} onChange={this.hanldeChange} />
                <button onClick={()=>{this.hancleclick()}}>add to Todos</button>
                <div style={{width:"30%",margin:"auto"}}>
                    {
                        todo?.map(item =><div key={quere.id} style={{ padding:"10px",margin:"2px", display:"flex",justifyContent:'space-between', border:"1px solid black"}}>{item.name}
                        <button onClick={this.handleDelte.bind(this,item.id)}>delete</button>
                        </div>
                        )
                    }
                    <div style={{display:"flex",justifyContent:'space-between',padding:"10px",margin:"2px"}}>
                        <button onClick={()=>{this.handlePagging(-1)}}>prev</button>
                        <button onClick={()=>{this.handlePagging(+1)}}>next</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Todos