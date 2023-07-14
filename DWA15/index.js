//ReactDOM.render(<h1>Hello, everyone!</h1>,document.getElementById("root") ) using h1 and u cand also use paragraph instead


// ReactDOM.render( //using unOrdered list
//     <ul>
//         <li>Thing 1</li>
//         <li>Thing 2</li>
//     </ul>,
//     document.getElementById("root"),
// )

//6
// function Navbar() { //6 using navigation bar and return custom MainContent function
//     return (
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <a className="navbar-brand" href="#">Navbar</a>
//             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                 <span className="navbar-toggler-icon"></span>
//             </button>

//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                 <ul className="navbar-nav mr-auto">
//                 <li className="nav-item active">
//                     <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
//                 </li>
//                 <li className="nav-item">
//                     <a className="nav-link" href="#">Link</a>
//                 </li>
//                 <li className="nav-item dropdown">
//                     <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                     Dropdown
//                     </a>
//                     <div className="dropdown-menu" aria-labelledby="navbarDropdown">
//                     <a className="dropdown-item" href="#">Action</a>
//                     <a className="dropdown-item" href="#">Another action</a>
//                     <div className="dropdown-divider"></div>
//                     <a className="dropdown-item" href="#">Something else here</a>
//                     </div>
//                 </li>
//                 <li className="nav-item">
//                     <a className="nav-link disabled" href="#">Disabled</a>
//                 </li>
//                 </ul>
//                 <form className="form-inline my-2 my-lg-0">
//                     <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
//                     <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//                 </form>
//             </div>
//         </nav>
//     )
// }

// function MainContent() {
//     return(
//         <h1>I'm learning react!</h1>
//     )
// }

// ReactDOM.render(
//     <div>
//         <Navbar/>
//         <MainContent/>

//     </div>,
//     document.getElementById("root")
// )

//7 declaretive(instuctions) and imperative(implementing steps)
// ReactDOM.render(
//     <h1>Hello,react!</h1>,
//     document.getElementById("root")
// )

// const h1 = document.createElement('h1')
// h1.textContent = "this is an imperative way to program"
// h1.className ="header"
// document.getElementById("root").append(h1)

//8jsx

// const h1 = document.createElement("h1")
// h1.textContent = "Hello World"
// h1.className = "header"
// console.log(h1)

// const page = (
//     <div>
//         <h1 className= "header">This is jsx</h1>
//         <p>this is paragraph</p>
//     </div>
// )
// ReactDOM.render(
//     page,
//    document.getElementById("root"),
// )

// challenge
const navbar = (
    <nav>
        <h1>takealot</h1>
        <ul>
            <li>Pricing</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
    </nav>
)

ReactDOM.render(navbar, document.getElementById("root"))