import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking } from 'react-native';

export default function BoutiqueCard({ item }) {
  const handleCall = () => {
    if (item.phone) {
      Linking.openURL(`tel:${item.phone}`);
    }
  };

  return (
    <View style={styles.cardOuterBox}>
      <View style={styles.imageWrapper}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.coverImage} 
        />
        <View style={styles.floatingBadge}>
          <Text style={styles.badgeText}>📍 {item.distance}</Text>
        </View>
      </View>

      
      <View style={styles.infoSection}>
        <Text style={styles.boutiqueName}>{item.name}</Text>
        
        <View style={styles.ratingRow}>
          <View style={styles.starBadge}>
            <Text style={styles.starText}>⭐ {item.rating || "4.9"}</Text>
          </View>
          <Text style={styles.reviewsText}>({item.reviewsCount || "120"} reviews)</Text>
        </View>
      </View>

      
      <View style={styles.dividerLine} />
      <View style={styles.contactDetailsSection}>
        <View style={styles.contactRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.metaIcon}>📞</Text>
          </View>
          <View style={styles.metaTextBox}>
            <Text style={styles.metaLabelText}>Phone</Text>
            <Text style={styles.metaValueText}>{item.phone}</Text>
          </View>
        </View>

        <View style={styles.contactRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.metaIcon}>✉️</Text>
          </View>
          <View style={styles.metaTextBox}>
            <Text style={styles.metaLabelText}>Email</Text>
            <Text style={styles.metaValueText} numberOfLines={1}>{item.email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionButtonRow}>
        <TouchableOpacity activeOpacity={0.7} style={styles.primaryActionButton} onPress={handleCall}>
          <Text style={styles.primaryButtonText}>Book Consultation</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} style={styles.secondaryDirectionButton}>
          <Text style={styles.secondaryButtonIcon}>↩️</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  cardOuterBox: {
    width: '100%',
    backgroundColor: '#ebf1fa', 
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#dce4f2',
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e4e4e7',
  },
  floatingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#18181b',
  },
  infoSection: {
    width: '100%',
    marginBottom: 14,
  },
  boutiqueName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#09090b',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starBadge: {
    backgroundColor: '#4ade80', 
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  starText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  reviewsText: {
    fontSize: 13,
    color: '#4b5563',
    fontWeight: '500',
  },
  dividerLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#d1d5db',
    marginBottom: 16,
  },
  contactDetailsSection: {
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#dbeafe', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  metaIcon: {
    fontSize: 14,
  },
  metaTextBox: {
    flex: 1,
  },
  metaLabelText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metaValueText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 1,
  },
  actionButtonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  primaryActionButton: {
    flex: 1,
    backgroundColor: '#000000', 
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryDirectionButton: {
    width: 50,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6b7280',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonIcon: {
    fontSize: 16,
  },
});