import { UilLock, UilEnvelopeAlt } from '@iconscout/react-unicons'

export default function ForgotPassword() {
    return (
        <div className="bg-[#DDE5F4] w-screen h-screen flex items-center justify-center">
            <div className="w-[350px] h-[550px] bg-[#ffff] rounded-[30px]">
                <div className="w-full h-auto flex justify-center mt-[10px]">
                    <div className="w-[150px] h-[150px]">
                        <img src="https://media.istockphoto.com/id/1321617070/vector/health-medical-logo.jpg?s=612x612&w=0&k=20&c=sus8vhG3c__vCdvOBLDhuf2vPUgIAudIAeUBApU_7Ew=" alt="Logo" className="w-full h-full" />
                    </div>
                </div>
                <div className="w-full h-auto flex justify-center">
                    <div className="w-3/4 h-[70px] bg-[#F1F7FA] rounded-[10px]">
                        <p className='ml-[10px] mt-[5px] font-mono '>Email address:</p>
                        <div className="flex items-center mt-[8px]">
                            <div className="w-[20px] h-[20px] ml-[10px]">
                                <UilEnvelopeAlt size={20} />
                            </div>
                            <input type="text" placeholder='username@gmail.com' className="pl-[5px] pb-[4px] font-mono  font-[10px] w-4/5 h-full outline-none rounded-[10px] ml-[10px]" />
                        </div>
                    </div>
                </div>
                <div className="w-full h-auto flex justify-center mt-[30px]">
                    <div className="w-3/4 h-[70px] bg-[#F1F7FA] rounded-[10px]">
                        <p className='ml-[10px] mt-[5px] font-mono '>Verified Code:</p>
                        <div className="flex items-center mt-[8px]">
                            <div className="w-[20px] h-[20px] ml-[10px]">
                                <UilLock size={20} />
                            </div>
                            <input type="password" placeholder='verified code' className="pl-[5px] pb-[4px] font-mono  font-[10px] w-3/5 h-full outline-none rounded-[10px] ml-[10px]" />
                            <button className="w-[50px] h-full bg-[#0872BB] text-white rounded-[10px] font-mono font-bold font-[7px] ml-[10px]">Send</button>
                        </div>
                    </div>
                </div>
                <div className="w-full h-auto flex justify-center mt-[30px]">
                    <div className="w-3/4 h-[70px] bg-[#F1F7FA] rounded-[10px]">
                        <p className='ml-[10px] mt-[5px] font-mono '>New password:</p>
                        <div className="flex items-center mt-[8px]">
                            <div className="w-[20px] h-[20px] ml-[10px]">
                                <UilLock size={20} />
                            </div>
                            <input type="password" placeholder='password...' className="pl-[5px] pb-[4px] font-mono  font-[10px] w-4/5 h-full outline-none rounded-[10px] ml-[10px]" />
                        </div>
                    </div>
                </div>
                <div className="w-full h-auto flex justify-center mt-[30px]">
                    <button href="/login" className="w-3/4 h-[40px] bg-[#0872BB] text-white rounded-[10px] font-mono font-bold font-[10px]">Save</button>
                </div>
                <div className="w-full h-auto flex justify-center mt-[10px]">
                    <div className='w-3/4 flex justify-between font-mono font-bold text-[13px]'>
                        <a href='/signup'>Sign up</a>
                        <a href='#'>Forgot password?</a>
                    </div>
                </div>
            </div>
        </div>
    );
}