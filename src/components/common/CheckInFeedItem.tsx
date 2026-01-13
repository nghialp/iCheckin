import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Checkin } from '../../graphql/types/checkin';

interface Props {
  checkin: Checkin;
}

const CheckInFeedItem: React.FC<Props> = ({ checkin }) => {
  // Format time (e.g., "2h ago")
  const formatTime = (dateString: string) => {
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

  // Parse hashtags from content
  const parseContent = (content?: string) => {
    if (!content) return [];
    const regex = /#\w+/g;
    return content.match(regex) || [];
  };

  const hashtags = parseContent(checkin.content);

  return (
    <View style={styles.container}>
      {/* User Info */}
      <View style={styles.header}>
        <Image 
          source={{ uri: checkin.user?.avatar || 'https://via.placeholder.com/40' }} 
          style={styles.avatar} 
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>{checkin.user?.name || 'Unknown User'}</Text>
          <Text style={styles.time}>{formatTime(checkin.checkedAt)}</Text>
        </View>
      </View>

      {/* Place Name */}
      <Text style={styles.place}>{checkin.place.name}</Text>

      {/* Content */}
      {checkin.content && (
        <Text style={styles.content}>{checkin.content}</Text>
      )}

      {/* Hashtags */}
      {hashtags.length > 0 && (
        <View style={styles.tagsContainer}>
          {hashtags.map((tag, index) => (
            <Text key={index} style={styles.tag}>
              {tag}{' '}
            </Text>
          ))}
        </View>
      )}

      {/* Images */}
      {checkin.place.thumbnail && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagesContainer}>
          <Image 
            source={{ uri: checkin.place.thumbnail }} 
            style={styles.image} 
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
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
  },
  userName: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 2,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  place: { 
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
  },
  content: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
    marginBottom: 8,
  },
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
  imagesContainer: {
    marginTop: 8,
  },
  image: { 
    width: 280,
    height: 140, 
    borderRadius: 8,
    marginRight: 8,
  },
});

export default CheckInFeedItem;