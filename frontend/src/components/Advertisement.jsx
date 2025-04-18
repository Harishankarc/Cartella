import AdImage from '../assets/image1.jpg'

export default function Advertisment() {
    return (
        <div className="flex flex-col-reverse md:flex-row justify-between mt-10 items-center border rounded-lg overflow-hidden px-4 md:px-2 pt-4 pb-6 md:pt-2 md:pb-2">
            <div className="flex flex-col tracking-wider max-w-full mt-5 md:mt-0 justify-start">
                <p className="text-xl leading-tight -mb-0">Where Comfort Meets Style</p>
                <div className="leading-[0]">
                    <h1 className="text-7xl md:text-[7rem] font-medium -mb-4">Timeless</h1>
                    <h1 className="text-7xl md:text-[7rem]  font-medium -mb-3">Everyday</h1>
                    <h1 className="text-7xl md:text-[7rem]  font-medium -mb-4">Fashion</h1>
                </div>
            </div>
            <img src={AdImage} alt="productImage" className="w-90 md:w-96 object-contain" />
        </div>
    );
}
