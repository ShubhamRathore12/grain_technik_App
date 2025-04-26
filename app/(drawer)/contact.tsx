import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function ContactScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.pageTitle}>Contact Us</Text>
      <Text style={styles.pageSubtitle}>
        We'd love to hear from you. Our team is always here to help.
      </Text>

      {/* Contact Information */}
      <View style={styles.contactInfoContainer}>
        <View style={styles.contactInfoCard}>
          <Phone size={24} color={Colors.brand.primary} />
          <View style={styles.contactInfoText}>
            <Text style={styles.contactInfoTitle}>Phone</Text>
            <TouchableOpacity onPress={() => Linking.openURL('tel:+11234567890')}>
              <Text style={styles.contactInfoValue}>+1 (123) 456-7890</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contactInfoCard}>
          <Mail size={24} color={Colors.brand.primary} />
          <View style={styles.contactInfoText}>
            <Text style={styles.contactInfoTitle}>Email</Text>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:support@graintechnik.com')}>
              <Text style={styles.contactInfoValue}>support@graintechnik.com</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contactInfoCard}>
          <MapPin size={24} color={Colors.brand.primary} />
          <View style={styles.contactInfoText}>
            <Text style={styles.contactInfoTitle}>Address</Text>
            <Text style={styles.contactInfoValue}>
              123 Industrial Avenue,{'\n'}
              Tech Park, Singapore 123456
            </Text>
          </View>
        </View>

        <View style={styles.contactInfoCard}>
          <Clock size={24} color={Colors.brand.primary} />
          <View style={styles.contactInfoText}>
            <Text style={styles.contactInfoTitle}>Working Hours</Text>
            <Text style={styles.contactInfoValue}>
              Monday - Friday: 9:00 AM - 6:00 PM{'\n'}
              Saturday: 10:00 AM - 2:00 PM{'\n'}
              Sunday: Closed
            </Text>
          </View>
        </View>
      </View>

      {/* Contact Form */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Send Us a Message</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.input} />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.input} />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Subject</Text>
          <View style={styles.input} />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Message</Text>
          <View style={[styles.input, styles.textArea]} />
        </View>
        
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Send Message</Text>
        </TouchableOpacity>
      </View>

      {/* FAQ Section */}
      <View style={styles.faqContainer}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        
        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>How do I register a new device?</Text>
          <Text style={styles.faqAnswer}>
            You can register a new device by going to the Registration section in the app 
            and filling out the device registration form with the required details.
          </Text>
        </View>
        
        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>What information is needed for device registration?</Text>
          <Text style={styles.faqAnswer}>
            You'll need the device serial number, model type, and purchase date. You may also 
            need to provide proof of purchase documentation.
          </Text>
        </View>
        
        <View style={styles.faqItem}>
          <Text style={styles.faqQuestion}>How can I get technical support?</Text>
          <Text style={styles.faqAnswer}>
            Technical support is available through our support portal, by email, or by phone. 
            Our technical team is available during business hours to assist with any issues.
          </Text>
        </View>
      </View>

      {/* Support Resources */}
      <View style={styles.resourcesContainer}>
        <Text style={styles.sectionTitle}>Additional Resources</Text>
        
        <TouchableOpacity style={styles.resourceItem}>
          <Text style={styles.resourceTitle}>User Manuals</Text>
          <ExternalLink size={18} color={Colors.brand.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.resourceItem}>
          <Text style={styles.resourceTitle}>Technical Documentation</Text>
          <ExternalLink size={18} color={Colors.brand.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.resourceItem}>
          <Text style={styles.resourceTitle}>Video Tutorials</Text>
          <ExternalLink size={18} color={Colors.brand.primary} />
        </TouchableOpacity>
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
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  contactInfoContainer: {
    marginBottom: 24,
  },
  contactInfoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  contactInfoText: {
    marginLeft: 16,
  },
  contactInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  contactInfoValue: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  textArea: {
    height: 120,
  },
  submitButton: {
    backgroundColor: Colors.brand.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  faqContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  faqItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  resourcesContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  resourceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  resourceTitle: {
    fontSize: 16,
    color: '#1F2937',
  },
});