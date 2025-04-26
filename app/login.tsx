import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { appLogo } from '@/assets/images/logo';
import Colors from '@/constants/Colors';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoginError('');
    const success = await signIn(values.email, values.password);
    
    if (success) {
      router.replace('/dashboard');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={{ uri: appLogo.uri }} style={styles.logo} />
            <Text style={styles.logoText}>Grain Technik</Text>
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
            
            {loginError ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{loginError}</Text>
              </View>
            ) : null}
            
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={loginSchema}
              onSubmit={handleLogin}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                <View style={styles.form}>
                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    error={touched.email && errors.email}
                  />
                  
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    error={touched.password && errors.password}
                  />
                  
                  <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>
                  
                  <Button
                    title="Login"
                    onPress={() => handleSubmit()}
                    isLoading={isSubmitting}
                    style={styles.loginButton}
                  />
                </View>
              )}
            </Formik>
            
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/registration')}>
                <Text style={styles.signupLink}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.brand.primary,
  },
  formContainer: {
    paddingHorizontal: 24,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
  },
  form: {
    width: '100%',
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#B91C1C',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: Colors.brand.primary,
    fontWeight: '500',
  },
  loginButton: {
    width: '100%',
    marginBottom: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  signupText: {
    color: '#6B7280',
  },
  signupLink: {
    color: Colors.brand.primary,
    fontWeight: '600',
  },
});