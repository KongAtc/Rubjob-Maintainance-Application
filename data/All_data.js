
import { useEffect, useState } from "react";
import { onSnapshot, getFirestore } from "firebase/firestore";
import { app } from "../screens/FirebaseDB";
import { doc, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
export const Dummy_all = () => {
  const [tasks, setTesks] = useState([]);
  const firestore = getFirestore(app);
  const bobo = [];
  const {user, role} = useSelector((state) => state.userInfo)
  const q = app.firestore().collection("Fix_list");

  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      const taskin = [];
      querySnapshot.forEach((doc) => {
        const { status, description, place, phone, time, url, rejectDesc, url_image_fix, description_fix} =
          doc.data();
        taskin.push({
          id: doc.id,
          description,
          place,
          phone,
          status,
          time,
          url,
          rejectDesc,
          url_image_fix,
          description_fix
        });
      });
      setTesks(taskin);
    });
  }, []);
  return tasks;
};
