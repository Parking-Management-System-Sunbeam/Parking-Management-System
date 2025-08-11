
import ButtonComponent from "./ButtonComponent";
import { MapPin, Phone, Clock, Star, CarFront ,IndianRupee, Info} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import FeedbackView from "./FeedbackView";
// import { getUserDetailsService } from "../Services/AuthService";


const SlotDetails = ({ value }) => {
  const nav = useNavigate();
  const {user} = useAuth();
  const userId = user ? user.id : 1; 

  const bookNow = () => {
    nav("/slot-booking", {
      state: {
        locid: value.id,
      },
    });
  };

//   const getUserDetails = async() => {
//     const res = await getUserDetailsService(userId, user.token);
//     console.log(res)
//   }

// useEffect(() => {
//   getUserDetails();
// }, []);
// console.log(value)

  return (
    <>
      <div className="p-6 flex flex-col justify-start overflow-hidden mt-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex justify-center h-[250px] w-2/5">
            <img
              src={value.image}
              alt="Image"
              className="w-auto h-auto object-cover rounded-2xl"
            />
          </div>
          <div className="h-[250px] p-5 w-3/5 text-justify bg-white   shadow-lg rounded-lg md:w-1/2 space-y-3">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <CarFront className="text-gray-600" size={24} />
              {value.location_name}
            </h2>

            <p className="text-gray-600 flex items-center gap-2">
              <Info size={18} className="text-gray-600" />
              {value.description}
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <MapPin size={18} className="text-gray-600" />
              {value.pincode}
            </p>

            <p className="text-gray-600 flex items-center gap-2">
              <IndianRupee size={18} className="text-gray-600" />
             {value.price} per hour
            </p>

            <p className="text-gray-600 flex items-center gap-2">
              <Clock size={18} className="text-gray-600" />
              All time
            </p>

            {/* <p className="text-gray-600 flex items-center gap-2">
             <Star size={24} className="text-yellow-400 fill-yellow-400" />
              {value.avgRating} / 5
            </p> */}
          </div>
        </div>

        <div className="mt-4 p-4 flex justify-center">
          <ButtonComponent title="Book Now" onPress={bookNow} />
        </div>

       

        {/* Feedback Section */}
        <div className="mt-8">
          <FeedbackView locationId={value.id} userId={userId} />
        </div>
      </div>
    </>
  );
};

export default SlotDetails;
