interface HeaderProps{
    userName:string
}
const Header = (props:HeaderProps):JSX.Element=>{
    return (
        <div>
            Hello {props.userName}!!
        </div>
    )
}
export default Header;