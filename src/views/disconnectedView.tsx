export const DisconnectedView = ({connectMeta, loading}) => {

    if (loading) return <div className="w-12 h-12 animate-spin rounded-full flex items-center justify-center bg-black" >
        <span className="w-11 h-12 rounded-full bg-gray-600"/>
    </div>

    return (
        <section className="flex flex-col gap-5">
            <h1 className="text-xl text-center md:text-5xl">Login with MetaMask-Web3</h1>
            <button onClick={connectMeta} className="text-center p-2 bg-black text-white rounded-md shadow-md shadow-red-50">Connect</button>
        </section>
    )
}