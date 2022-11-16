import React from "react";
import { useEffect, useState } from "react";
import { onSnapshot,query, where, collection, getFirestore } from "firebase/firestore";
import { app } from "../screens/FirebaseDB";
import { doc, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";

 export const Dummy = () => {
  const [tasks, setTesks] = useState([]);
  const firestore = getFirestore(app);
  const bobo = [];
  const {user, role} = useSelector((state) => state.userInfo);

  const q = query(
      collection(firestore, "Fix_list"),
      where("req_user", "==", user)
    );
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
