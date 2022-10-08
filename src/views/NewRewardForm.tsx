import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {FC, useMemo, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Reward} from '../types/reward';
import TextInput, {Props as TextInputProps} from '../components/TextInput';
import {User} from '../types/user';
import TextInputWithOptions from '../components/TextInputWithOptions';
import TextButton from '../components/TextButton';
import api from '../services/api';

interface Props {
  onAddReward: (newReward: Reward) => void;
  users: User[];
  currentUser: User;
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

const NewRewardForm: FC<Props> = ({onAddReward, users, currentUser}) => {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [error, setError] = useState<ErrorState | null>(null);
  const [loading, setLoading] = useState(false);

  const transformedUsers = useMemo(() => users.map(user => user.name), [users]);

  const setFormField = (field: FormField) => (text: string) => {
    setForm(prevForm => ({...prevForm, [field]: text}));
    if (error) {
      setError(null);
    }
  };

  const addReward = async () => {
    const errorData = validateFields(form);
    if (errorData) {
      return setError(errorData);
    }
    const {amount, to, message} = form;
    const user = users.find(u => u.name === to);
    if (!user) {
      return setError({field: 'to', text: 'There is no user with this name'});
    }
    setLoading(true);
    const newReward = await api.addReward({
      received: +amount,
      userName: user.name,
      userId: user.id,
      text: message,
      rewardedBy: currentUser,
    });
    setLoading(false);
    onAddReward(newReward);
    setForm(initialFormState);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <Text style={styles.title}>Give Reward</Text>
          {formFields.map(field => {
            const commonProps: TextInputProps = {
              value: form[field],
              label: field,
              onChangeText: setFormField(field),
              error: error?.field === field && error.text,
              keyboardType: field === 'amount' ? 'numeric' : 'default',
            };
            return (
              <View style={styles.inputWrapper} key={field}>
                {field === 'to' ? (
                  <TextInputWithOptions
                    options={transformedUsers}
                    {...commonProps}
                  />
                ) : (
                  <TextInput {...commonProps} />
                )}
              </View>
            );
          })}
          <View style={styles.giveBtn}>
            <TextButton text="Give" onPress={addReward} loading={loading} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
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
    marginTop: 30,
    marginHorizontal: 30,
  },
});

export default NewRewardForm;
