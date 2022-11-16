import React from "react";
import { useEffect, useState } from "react";
import { onSnapshot,query, where, collection, getFirestore, orderBy } from "firebase/firestore";
import { app } from "../screens/FirebaseDB";
import { doc, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";

 export const TDummy = () => {
  const [tasks, setTesks] = useState([]);
  const firestore = getFirestore(app);
  const bobo = [];
  const {user, role} = useSelector((state) => state.userInfo);

  const q = collection(firestore, "Fix_list");
    const qt = query(
        q,
        orderBy("time")
      );
  useEffect(() => {
    onSnapshot(qt, (querySnapshot) => {
      const taskin = [];
      const req = [];
      const pen = [];
      const suc = [];
      const rej = [];
      querySnapshot.forEach((doc) => {
        const { status, description, place, phone, time, url, rejectDesc, url_image_fix, description_fix} =
          doc.data();
        taskin.push({
            status,
            time
          })
        
      });
      setTesks(taskin);
    });
  }, []);

  return tasks;
};
