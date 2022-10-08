import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {FC, useMemo, useState} from 'react';
import {Reward} from '../types/reward';
import TextInput from '../components/TextInput';
import {User} from '../types/user';

export type RewardInfo = Pick<
  Reward,
  'userId' | 'userName' | 'received' | 'text'
>;

interface Props {
  onAddReward: (rewardInfo: RewardInfo) => void;
  users: User[];
}

interface FormState {
  to: string;
  amount: string;
  message: string;
}

type FormField = keyof FormState;

interface ErrorState {
  field: FormField;
  text: string;
}

const initialFormState: FormState = {
  to: '',
  amount: '',
  message: '',
};

const formFields = Object.keys(initialFormState) as FormField[];

const validateFields = (fields: FormState): ErrorState | null => {
  for (let field in fields) {
    const typedField = field as FormField;
    const value = fields[typedField];
    if (!value) {
      return {field: typedField, text: 'The field is required'};
    }
    if (typedField === 'amount' && !value.match(/^\d+$/)) {
      return {field: typedField, text: 'Only numbers are allowed'};
    }
  }
  return null;
};

const NewRewardForm: FC<Props> = ({onAddReward, users}) => {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [error, setError] = useState<ErrorState | null>(null);

  const setFormField = (field: FormField) => (text: string) => {
    setForm(prevForm => ({...prevForm, [field]: text}));
    if (error) {
      setError(null);
    }
  };

  const addReward = () => {
    const errorData = validateFields(form);
    if (errorData) {
      return setError(errorData);
    }
    const {amount, to, message} = form;
    const user = users.find(u => u.name === to);
    if (!user) {
      return setError({field: 'to', text: 'There is no user with this name'});
    }
    onAddReward({
      received: +amount,
      userName: user.name,
      userId: user.id,
      text: message,
    });
    setForm(initialFormState);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <Text style={styles.title}>Give Reward</Text>
          {formFields.map(field => (
            <View style={styles.inputWrapper} key={field}>
              <TextInput
                value={form[field]}
                label={field}
                onChangeText={setFormField(field)}
                error={error?.field === field && error.text}
                keyboardType={field === 'amount' ? 'numeric' : 'default'}
              />
            </View>
          ))}
          <TouchableOpacity style={styles.giveBtn} onPress={addReward}>
            <Text style={styles.btnText}>Give</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'stretch',
    zIndex: 2,
  },
  title: {
    color: '#ffffff',
    fontSize: 25,
    alignSelf: 'center',
  },
  inputWrapper: {
    marginTop: 20,
  },
  giveBtn: {
    backgroundColor: '#ffffff',
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
    marginHorizontal: 30,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default NewRewardForm;
