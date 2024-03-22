import Header from "./Header";

export default function Homepage() {
    return (
        <div className="w-screen h-auto">
            <Header />
            <div className="slider w-full h-[700px]">
                <img className="w-full h-full object-fill" src="https://cdn.dribbble.com/userupload/10482978/file/original-bdc2f1572bfaa5fd60f34f9e85412a12.jpg?resize=752x" />
            </div>
            {/* <div className="w-full h-auto flex justify-center mt-[30px]">
                <div className="w-4/5">
                    <p className="font-mono text-[#109AE5] text-[35px] font-bold">Welcome to Healthcare</p>
                    <p className="font-mono text-[#109AE5] text-[20px] font-bold">We are here to help you</p>
                    <div className="bg-[#109AE5] w-full h-[1px]"></div>
                </div>
            </div> */}
        </div>
    );
}