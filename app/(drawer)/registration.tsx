import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Colors from '@/constants/Colors';

// Validation schema
const registrationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const accountTypes = ['Manufactura', 'Customer'];
const monitorAccessOptions = ['Basic', 'Standard', 'Premium', 'Enterprise'];
const companies = ['Acme Corp', 'TechGlobal', 'IndustrialSolutions', 'ManufacturingPlus'];

export default function RegistrationScreen() {
  const [accountType, setAccountType] = useState('Customer');
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [isAccessDropdownOpen, setIsAccessDropdownOpen] = useState(false);
  const [selectedAccess, setSelectedAccess] = useState('');

  const handleSubmit = (values: any) => {
    console.log('Form submitted:', { ...values, accountType, selectedCompany, selectedAccess });
    // Handle form submission logic here
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.formCard}>
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>Create Account</Text>
          <Text style={styles.formSubtitle}>Fill in your details to register</Text>
        </View>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            phoneNumber: '',
            password: '',
          }}
          validationSchema={registrationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <View style={styles.form}>
              {/* Account Type Selection */}
              <View style={styles.accountTypeContainer}>
                {accountTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.accountTypeButton,
                      accountType === type && styles.accountTypeButtonActive,
                    ]}
                    onPress={() => setAccountType(type)}
                  >
                    <Text
                      style={[
                        styles.accountTypeText,
                        accountType === type && styles.accountTypeTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Personal Information */}
              <View style={styles.formRow}>
                <View style={styles.formColumn}>
                  <Input
                    label="First Name"
                    placeholder="Enter first name"
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                    error={touched.firstName && errors.firstName}
                  />
                </View>

                <View style={styles.formColumn}>
                  <Input
                    label="Last Name"
                    placeholder="Enter last name"
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    value={values.lastName}
                    error={touched.lastName && errors.lastName}
                  />
                </View>
              </View>

              <Input
                label="Username"
                placeholder="Choose a username"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                error={touched.username && errors.username}
              />

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
                label="Phone Number"
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                error={touched.phoneNumber && errors.phoneNumber}
              />

              {/* Company Dropdown */}
              <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Company</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
                >
                  <Text style={styles.dropdownText}>
                    {selectedCompany || 'Select Company'}
                  </Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>
                {isCompanyDropdownOpen && (
                  <View style={styles.dropdownMenu}>
                    {companies.map((company) => (
                      <TouchableOpacity
                        key={company}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setSelectedCompany(company);
                          setIsCompanyDropdownOpen(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{company}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Monitor Access Dropdown */}
              <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Monitor Access</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setIsAccessDropdownOpen(!isAccessDropdownOpen)}
                >
                  <Text style={styles.dropdownText}>
                    {selectedAccess || 'Select...'}
                  </Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>
                {isAccessDropdownOpen && (
                  <View style={styles.dropdownMenu}>
                    {monitorAccessOptions.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setSelectedAccess(option);
                          setIsAccessDropdownOpen(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <Input
                label="Password"
                placeholder="Create a password"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={touched.password && errors.password}
              />

              <Button
                title="Register"
                onPress={() => handleSubmit()}
                isLoading={isSubmitting}
                style={styles.submitButton}
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  formHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  form: {
    padding: 24,
  },
  accountTypeContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  accountTypeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  accountTypeButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  accountTypeText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  accountTypeTextActive: {
    color: '#1F2937',
    fontWeight: '600',
  },
  formRow: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  formColumn: {
    flex: 1,
    paddingHorizontal: 8,
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.light.inputBackground,
  },
  dropdownText: {
    fontSize: 16,
    color: '#1F2937',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#6B7280',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 76,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#1F2937',
  },
  submitButton: {
    marginTop: 8,
  },
});