import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";

interface FormValues {
  accountType: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  company: string;
  locations: string[];
  password: string;
  confirmPassword: string;
  monitorAccess: string[];
}

// Yup Schema
const validationSchema = Yup.object().shape({
  accountType: Yup.string()
    .oneOf(["manufacture", "customer"], "Please select an account type")
    .required("Please select an account type"),
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  company: Yup.string()
    .min(1, "Please select a company")
    .required("Company is required"),
  locations: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one location")
    .required("At least one location is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  monitorAccess: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one monitor access option")
    .required("At least one monitor access is required"),
});

const accountTypes = ["manufacture", "customer"];
const companies = ["Company A", "Company B"];
const locationsList = ["Location 1", "Location 2"];
const monitorAccessOptions = [
  "Overview",
  "Devices",
  "Dashboards",
  "Notifications",
  "Reports",
];

export default function RegistrationScreen() {
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isAccessDropdownOpen, setIsAccessDropdownOpen] = useState(false);

  const initialValues: FormValues = {
    accountType: "customer",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    company: "",
    locations: [],
    password: "",
    confirmPassword: "",
    monitorAccess: [],
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const payload = {
        ...values,
        email: values.accountType === "manufacture" ? values.email : undefined,
        monitorAccess: values.monitorAccess,
      };

      const response = await fetch(
        "https://grain-backend.onrender.com/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
      } else {
        console.error("Registration error:", data.message);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.formCard}>
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>Create Account</Text>
          <Text style={styles.formSubtitle}>
            Fill in your details to register
          </Text>
        </View>

        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
          }) => (
            <View style={styles.form}>
              {/* Account Type */}
              <View style={styles.accountTypeContainer}>
                {accountTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.accountTypeButton,
                      values.accountType === type &&
                        styles.accountTypeButtonActive,
                    ]}
                    onPress={() => setFieldValue("accountType", type)}
                  >
                    <Text
                      style={[
                        styles.accountTypeText,
                        values.accountType === type &&
                          styles.accountTypeTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* First & Last Name */}
              <View style={styles.formRow}>
                <View style={styles.formColumn}>
                  <Input
                    label="First Name"
                    placeholder="Enter first name"
                    value={values.firstName}
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    error={touched.firstName ? errors.firstName : undefined}
                  />
                </View>
                <View style={styles.formColumn}>
                  <Input
                    label="Last Name"
                    placeholder="Enter last name"
                    value={values.lastName}
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    error={touched.lastName ? errors.lastName : undefined}
                  />
                </View>
              </View>

              {/* Username */}
              <Input
                label="Username"
                placeholder="Choose a username"
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                error={touched.username ? errors.username : undefined}
              />

              {/* Email */}
              <Input
                label="Email"
                placeholder="Enter your email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={touched.email ? errors.email : undefined}
              />

              {/* Phone Number */}
              <Input
                label="Phone Number"
                placeholder="Enter phone number"
                value={values.phoneNumber}
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                error={touched.phoneNumber ? errors.phoneNumber : undefined}
              />

              {/* Company Dropdown */}
              <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Company</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() =>
                    setIsCompanyDropdownOpen(!isCompanyDropdownOpen)
                  }
                >
                  <Text style={styles.dropdownText}>
                    {values.company || "Select Company"}
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
                          setFieldValue("company", company);
                          setIsCompanyDropdownOpen(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{company}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Locations */}
              <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Locations</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() =>
                    setIsLocationDropdownOpen(!isLocationDropdownOpen)
                  }
                >
                  <Text style={styles.dropdownText}>
                    {values.locations.length > 0
                      ? values.locations.join(", ")
                      : "Select Locations"}
                  </Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>
                {isLocationDropdownOpen && (
                  <View style={styles.dropdownMenu}>
                    {locationsList.map((location) => (
                      <TouchableOpacity
                        key={location}
                        style={styles.dropdownItem}
                        onPress={() => {
                          const alreadySelected =
                            values.locations.includes(location);
                          const newLocations = alreadySelected
                            ? values.locations.filter(
                                (loc: string) => loc !== location
                              )
                            : [...values.locations, location];
                          setFieldValue("locations", newLocations);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{location}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Monitor Access */}
              <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Monitor Access</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setIsAccessDropdownOpen(!isAccessDropdownOpen)}
                >
                  <Text style={styles.dropdownText}>
                    {values.monitorAccess.length > 0
                      ? values.monitorAccess.join(", ")
                      : "Select Access"}
                  </Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </TouchableOpacity>
                {isAccessDropdownOpen && (
                  <View style={styles.dropdownMenu}>
                    {monitorAccessOptions.map((access) => (
                      <TouchableOpacity
                        key={access}
                        style={styles.dropdownItem}
                        onPress={() => {
                          const alreadySelected =
                            values.monitorAccess.includes(access);
                          const newAccess = alreadySelected
                            ? values.monitorAccess.filter(
                                (a: string) => a !== access
                              )
                            : [...values.monitorAccess, access];
                          setFieldValue("monitorAccess", newAccess);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{access}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Password */}
              <Input
                label="Password"
                placeholder="Enter password"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                error={touched.password ? errors.password : undefined}
              />

              {/* Confirm Password */}
              <Input
                label="Confirm Password"
                placeholder="Confirm password"
                secureTextEntry
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                error={
                  touched.confirmPassword ? errors.confirmPassword : undefined
                }
              />

              {/* Submit Button */}
              <Button
                title={isSubmitting ? "Registering..." : "Register"}
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
    backgroundColor: "#F9FAFB",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  formHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    alignItems: "center",
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  form: {
    padding: 24,
  },
  accountTypeContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  accountTypeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
  },
  accountTypeButtonActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  accountTypeText: {
    color: "#6B7280",
    fontWeight: "500",
  },
  accountTypeTextActive: {
    color: "#1F2937",
    fontWeight: "600",
  },
  formRow: {
    flexDirection: "row",
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
    fontWeight: "500",
    color: "#374151",
    marginBottom: 6,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.light.inputBackground,
  },
  dropdownText: {
    fontSize: 16,
    color: "#1F2937",
  },
  dropdownIcon: {
    fontSize: 12,
    color: "#6B7280",
  },
  dropdownMenu: {
    position: "absolute",
    top: 76,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    zIndex: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#1F2937",
  },
  submitButton: {
    marginTop: 8,
  },
});
