import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Checkin } from '../../graphql/interfaces/entities/checkin.interface';

interface Props {
  checkin: Checkin;
}

/**
 * Format elapsed time to relative format
 * @param dateString - ISO date string
 * @returns Formatted time string (e.g., "2h ago")
 */
const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};

/**
 * Extract hashtags from content
 * @param content - Text content
 * @returns Array of hashtags
 */
const extractHashtags = (content?: string): string[] => {
  if (!content) return [];
  const hashtagRegex = /#\w+/g;
  return content.match(hashtagRegex) || [];
};

const CheckInFeedItem: React.FC<Props> = ({ checkin }) => {
  const hashtags = useMemo(() => extractHashtags(checkin.content), [checkin.content]);

  return (
    <View style={styles.container}>
      {/* User Info Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: checkin.user?.avatar || 'https://via.placeholder.com/40' }}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>{checkin.user?.name || 'Unknown User'}</Text>
          <Text style={styles.time}>{formatRelativeTime(checkin.checkedAt)}</Text>
        </View>
      </View>

      {/* Place Name */}
      <Text style={styles.place}>{checkin.place.name}</Text>

      {/* Check-in Content */}
      {checkin.content && <Text style={styles.content}>{checkin.content}</Text>}

      {/* Hashtags */}
      {hashtags.length > 0 && (
        <View style={styles.tagsContainer}>
          {hashtags.map((tag) => (
            <Text key={tag} style={styles.tag}>
              {tag}{' '}
            </Text>
          ))}
        </View>
      )}

      {/* Place Thumbnail Image */}
      {checkin.place.thumbnail && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imagesContainer}
          scrollEventThrottle={16}
        >
          <Image source={{ uri: checkin.place.thumbnail }} style={styles.image} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Container Styles
  container: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  // Header Section
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  userName: {
    fontWeight: '600',
    fontSize: 14,
    color: '#1a1a1a',
    marginBottom: 2,
  },
  time: {
    fontSize: 12,
    color: '#999999',
  },

  // Content Section
  place: {
    fontWeight: '700',
    fontSize: 14,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  content: {
    fontSize: 13,
    color: '#333333',
    lineHeight: 18,
    marginBottom: 8,
  },

  // Hashtags Section
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '500',
  },

  // Images Section
  imagesContainer: {
    marginTop: 8,
  },
  image: {
    width: 280,
    height: 140,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  },
});

export default CheckInFeedItem;