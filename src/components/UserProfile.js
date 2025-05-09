import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth, storage } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../styles/UserProfile.css';
import GoBackButton from './GoBackButton';

function UserProfile() {
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [faculty, setFaculty] = useState('');
  const [courses, setCourses] = useState(['']);
  const [preference, setPreference] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [photoURL, setPhotoURL] = useState('');
  const navigate = useNavigate();

  const institutions = [
    "אוניברסיטת אריאל בשומרון",
    "אוניברסיטת בן-גוריון בנגב",
    "אוניברסיטת בר-אילן",
    "אוניברסיטת חיפה",
    "אוניברסיטת תל אביב",
    "האוניברסיטה העברית בירושלים",
    "האוניברסיטה הפתוחה",
    "הטכניון – מכון טכנולוגי לישראל",
    "מכון ויצמן למדע",
    "אפקה – המכללה האקדמית להנדסה בתל אביב",
    "בצלאל – אקדמיה לאמנות ועיצוב ירושלים",
    "האקדמיה למוסיקה ולמחול בירושלים",
    "המכללה האקדמית אחוה",
    "המכללה האקדמית אשקלון",
    "המכללה האקדמית גליל מערבי",
    "המכללה האקדמית הדסה ירושלים",
    "המכללה האקדמית כנרת בעמק הירדן",
    "המכללה האקדמית להנדסה סמי שמעון",
    "המכללה האקדמית ספיר",
    "המכללה האקדמית עמק יזרעאל ע\"ש מקס שטרן",
    "המכללה האקדמית צפת",
    "המכללה האקדמית של תל-אביב יפו",
    "המכללה האקדמית תל חי",
    "המרכז האקדמי לב",
    "המרכז האקדמי רופין",
    "מכון טכנולוגי חולון (HIT)",
    "המכללה האקדמית להנדסה אורט בראודה",
    "עזריאלי – המכללה האקדמית להנדסה ירושלים",
    "שנקר – הנדסה, עיצוב, אמנות",
    "הקריה האקדמית אונו",
    "המרכז האקדמי פרס",
    "המרכז האקדמי שערי מדע ומשפט",
    "המרכז האקדמי למשפט ולעסקים",
    "המרכז ללימודים אקדמיים באור יהודה",
    "המרכז האקדמי שלם",
    "מכללת לוינסקי לחינוך",
    "סמינר הקיבוצים",
    "מכללת סכנין להכשרת עובדי הוראה",
    "המכללה האקדמית לחינוך אורנים",
    "המכללה האקדמית לחינוך אורות ישראל",
    "מכללת בית ברל לחינוך",
    "המכללה האקדמית הדתית לחינוך שאנן",
    "המכללה האקדמית הערבית לחינוך בישראל – חיפה",
    "המכללה האקדמית וינגייט",
    "המכללה האקדמית לחינוך תלפיות",
    "המכללה האקדמית לחינוך גבעת וושינגטון",
    "המכללה האקדמית לחינוך ולספורט אוהלו בקצרין",
    "המכללה האקדמית לחינוך ע\"ש דוד ילין",
    "המכללה האקדמית לחינוך ע\"ש קיי",
    "המכללה האקדמית לחינוך ע\"ש א.ד. גורדון",
    "המרכז האקדמי לעיצוב ולחינוך ויצו חיפה ע\"ש נרי בלומפילד",
    "חמדת הדרום – המכללה האקדמית לחינוך",
    "מכללה ירושלים",
    "מכללת הרצוג",
    "מכללת אמונה-אפרתה"
  ];

  const faculties = [
    "הנדסה",
    "מדעי המחשב",
    "מדעי החיים",
    "מדעי הטבע",
    "מדעי הרוח",
    "מדעי החברה",
    "ניהול/מנהל עסקים",
    "משפטים",
    "רפואה",
    "רפואת שיניים",
    "הנדסה ביו-רפואית",
    "הנדסת חשמל ומחשבים",
    "הנדסת מכונות",
    "הנדסה אזרחית וסביבתית",
    "הנדסה כימית",
    "הנדסת תעשייה וניהול",
    "הנדסת ביוטכנולוגיה ומזון",
    "ארכיטקטורה ותכנון ערים",
    "אמנויות",
    "חקלאות, מזון וסביבה",
    "רפואה וטרינרית",
    "רוקחות",
    "חינוך",
    "עבודה סוציאלית",
    "מדעי הבריאות",
    "פיזיקה",
    "כימיה",
    "גיאוגרפיה",
    "היסטוריה",
    "פילוסופיה",
    "מוזיקה",
    "עיצוב"
  ];
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    try {
      const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setPhotoURL(downloadURL);
      console.log('תמונה הועלתה בהצלחה', downloadURL);
    } catch (error) {
      console.error('שגיאה בהעלאת התמונה:', error);
    }
  };
  

  const handleAddCourse = () => {
    setCourses([...courses, '']);
  };

  const handleCourseChange = (index, value) => {
    const newCourses = [...courses];
    newCourses[index] = value;
    setCourses(newCourses);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!name) newErrors.name = true;
    if (!institution) newErrors.institution = true;
    if (!faculty) newErrors.faculty = true;
    if (courses.some(c => !c)) newErrors.courses = true;
    if (!preference) newErrors.preference = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      setMessage('🛑 נא למלא את כל השדות');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setMessage('🛑 לא ניתן לשמור בלי להתחבר');
      return;
    }

    const profileData = {
      name,
      institution,
      faculty,
      courses,
      preference,
      email: user.email,
      uid: user.uid,
      photoURL, // ✅ הוספת כתובת התמונה
    };

    try {
      await setDoc(doc(db, 'users', user.uid), profileData);
      setMessage('✅ הפרופיל נשמר בהצלחה!');
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (err) {
      setMessage('❌ שגיאה בשמירה: ' + err.message);
    }
  };

  return (
    <div className="profile-container">
      <GoBackButton />
      <h2 className="profile-title">יצירת פרופיל משתמש</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <input
          type="text"
          placeholder="שם מלא"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? 'input-error' : ''}
        />

        <select
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          className={errors.institution ? 'input-error' : ''}
        >
          <option value="">בחר מוסד לימודים</option>
          {institutions.map((inst, i) => (
            <option key={i} value={inst}>{inst}</option>
          ))}
        </select>

        <select
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
          className={errors.faculty ? 'input-error' : ''}
        >
          <option value="">בחר פקולטה / חוג</option>
          {faculties.map((fac, i) => (
            <option key={i} value={fac}>{fac}</option>
          ))}
        </select>

        {courses.map((course, index) => (
          <input
            key={index}
            type="text"
            placeholder={`קורס ${index + 1}`}
            value={course}
            onChange={(e) => handleCourseChange(index, e.target.value)}
            className={errors.courses && !course ? 'input-error' : ''}
          />
        ))}

        <button type="button" onClick={handleAddCourse}>➕ הוסף קורס</button>
        <button type="button" onClick={() => setCourses(courses.slice(0, -1))}>➖ מחק קורס אחרון</button>

        <select
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
          className={errors.preference ? 'input-error' : ''}
        >
          <option value="">העדפת לימוד</option>
          <option value="zoom">זום</option>
          <option value="frontal">פרונטלי</option>
          <option value="any">לא משנה</option>
        </select>

        <div className="button-container">
          <button type="submit">שמור פרופיל 💾</button>
          {message && <p>{message}</p>}
        </div>
      </form>
    </div>
  );
}

export default UserProfile;