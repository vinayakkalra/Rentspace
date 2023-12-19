import {ActivityIndicator, Alert, Image, Modal, StyleSheet, Text, View} from 'react-native';
import {useState, useEffect} from 'react';
import {SIZES, COLORS} from '../../constants/themes';
import {images} from '../../constants';

import {
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Calendar} from 'react-native-calendars';
import {User} from '../../declarations/User/index.js';
import { useSelector,useDispatch } from 'react-redux';
import { setUser } from '../../redux/users/actions';

const BottomSheetFinishSignUp = ({openComm,closeModal}) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [DOB, setDOB] = useState('Birthday(dd/mm/yyyy)');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selected, setSelected] = useState('');
  const [loading,setLoading]=useState(false)

  const {user} =useSelector(state=>state.userReducer)
  const {actors}=useSelector(state=>state.actorReducer)
  const dispatch=useDispatch()
  

  async function signUp(){
    setLoading(true)
    const id=Math.round(Math.random()*1000).toString()
    await actors.userActor?.createUser(fname,lname,DOB,email,"user").then(async(res)=>{
      //setUser(res[0])
      console.log(res)
      setLoading(false)
      alert(`Welcome ${fname}! You are successfully registered `)
      
      //alert('Welcome'+res[0]?.firstName)
      await actors.userActor?.getUserInfo().then((res)=>{
        console.log(res[0]),
        // setUser(res[0])
        dispatch(setUser(res[0]))
        openComm()
        closeModal()
        console.log(user)
      })
    }).catch((err)=>{console.log(err)})
    //alert(email)
  }
 

  return (
    <View style={styles.bottomSheet}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if(user?.fname!=null){
              closeModal();
            }else{
              alert('Please Register first to continue further')
            }
            
          }}>
          <Image source={images.cross} style={styles.crossImg} />
        </TouchableOpacity>

        <Text style={styles.heading}>FINISHING SIGNING UP</Text>
      </View>
      <TextInput
        placeholder="First name"
        placeholderTextColor={COLORS.inputBorder}
        style={styles.firstName}
        value={fname}
        onChangeText={value => {
          setFname(value);
        }}
      />
      <TextInput
        placeholder="Last name"
        placeholderTextColor={COLORS.inputBorder}
        style={styles.lastName}
        value={lname}
        onChangeText={value => {
          setLname(value);
        }}
      />
      <Text style={styles.simpleText}>
        Make sure it matches the name on your ID
      </Text>
      <TouchableOpacity
        style={styles.dateDiv}
        onPress={() => {
          setShowCalendar(true);
        }}>
        <Text style={styles.dateDivText}>{DOB}</Text>
        <Image source={images.next} />
      </TouchableOpacity>
      <Text style={styles.simpleText}>
        To sign up, you need to be at level 18. Your birthday won’t be shared
        with other people who use Rent space.
      </Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={COLORS.inputBorder}
        style={styles.simpleInput}
        value={email}
        onChangeText={value => {
          setEmail(value);
        }}
      />
      <Text style={styles.simpleText}>
        We’ll email you trip confirmations and receipts.
      </Text>
      <Text style={styles.simpleText}>
        By selecting Agree and continue, I agree to Rent space's{' '}
        <Text style={styles.linkText}>
          Terms of Service, Payments Terms of Service and Nondiscrimination
          Policy
        </Text>{' '}
        and acknowledge the <Text style={styles.linkText}>Privacy Policy.</Text>
      </Text>
      <ActivityIndicator size={40} animating={loading}/>
      <TouchableOpacity style={styles.submitBtn} onPress={()=>{signUp()}}>
        <Text style={styles.submitText}>Accept and continue</Text>
      </TouchableOpacity>
      <Modal visible={showCalendar} animationType="fade" transparent>
        <View>
          <Calendar
            onDayPress={day => {
              setSelected(day.dateString);
              setDOB(`${day.day}/${day.month}/${day.year}`);
              setShowCalendar(false);
            }}
            style={styles.calendar}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: COLORS.inputBorder,
              },
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default BottomSheetFinishSignUp;

const styles = StyleSheet.create({
  bottomSheet: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  crossImg: {
    width: 17,
    height: 17,
    marginRight: '20%',
  },
  heading: {
    fontSize: SIZES.preMedium,
    fontWeight: 'bold',
    color: 'black',
  },
  simpleText: {
    color: COLORS.textLightGrey,
    fontSize: SIZES.small,
    width: '80%',
    marginBottom: 20,
  },
  simpleInput: {
    borderColor: COLORS.inputBorder,
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    marginBottom: 20,
    height: 50,
    padding: 15,
    color: COLORS.inputBorder,
    fontSize: SIZES.preMedium,
    opacity: 0.5,
  },
  dateDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.inputBorder,
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    height: 50,
    padding: 15,
    color: COLORS.inputBorder,
    fontSize: SIZES.preMedium,
    opacity: 0.5,
    minWidth: '80%',
  },
  dateDivText: {
    color: COLORS.inputBorder,
    fontSize: SIZES.preMedium,
    opacity: 0.5,
    marginRight: 'auto',
  },
  firstName: {
    borderColor: COLORS.inputBorder,
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: '80%',
    marginBottom: 0,
    height: 50,
    padding: 15,
    color: COLORS.inputBorder,
    fontSize: SIZES.preMedium,
    opacity: 0.5,
  },
  lastName: {
    borderColor: COLORS.inputBorder,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: '80%',
    marginBottom: 20,
    height: 50,
    padding: 15,
    color: COLORS.inputBorder,
    fontSize: SIZES.preMedium,
    opacity: 0.5,
  },
  linkText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  submitBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: COLORS.inputBorder,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 80,
    marginTop: 10,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: SIZES.medium,
  },
  calendar: {
    marginHorizontal: 35,
    borderRadius: 10,
    elevation: 2,
    marginTop: '60%',
    borderWidth: 1,
    borderBlockColor: COLORS.inputBorder,
  },
});
