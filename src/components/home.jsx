import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { increment, decrement, incrementByState } from "../storage/reducers"
function Home() {
    const navigate = useNavigate();
    const storeState = useSelector((state) => state.counter.value);
    console.log(storeState)
    const dispatch = useDispatch()
    return <>
        Home
        <button onClick={() => navigate("/todo")}>TODO</button>
        <button onClick={() => navigate("/user")}>User</button>
        <p>Counter is here : {storeState}</p>
        <button onClick={() => {
            dispatch(increment())
        }}>Increment</button>
        <button onClick={() => {
            dispatch(decrement())
        }}>decrement</button>
    </>
}

export default Home;