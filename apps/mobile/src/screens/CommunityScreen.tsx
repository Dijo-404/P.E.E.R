import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CommunityScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <Text style={styles.title}>Community</Text>
                    <Text style={styles.subtitle}>Connect with fellow learners</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Study Groups</Text>
                    <View style={styles.groupCard}>
                        <View style={styles.groupHeader}>
                            <Text style={styles.groupIcon}></Text>
                            <View style={styles.groupInfo}>
                                <Text style={styles.groupName}>Math Enthusiasts</Text>
                                <Text style={styles.groupMembers}>124 members</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.joinButton}>
                            <Text style={styles.joinButtonText}>Join</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.groupCard}>
                        <View style={styles.groupHeader}>
                            <Text style={styles.groupIcon}></Text>
                            <View style={styles.groupInfo}>
                                <Text style={styles.groupName}>Science Explorers</Text>
                                <Text style={styles.groupMembers}>98 members</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.joinButton}>
                            <Text style={styles.joinButtonText}>Join</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Discussions</Text>
                    <View style={styles.discussionCard}>
                        <Text style={styles.discussionTitle}>How to solve quadratic equations?</Text>
                        <Text style={styles.discussionMeta}>Posted by Raj • 2 hours ago</Text>
                        <View style={styles.discussionStats}>
                            <Text style={styles.discussionStat}>12 replies</Text>
                            <Text style={styles.discussionStat}>8 likes</Text>
                        </View>
                    </View>

                    <View style={styles.discussionCard}>
                        <Text style={styles.discussionTitle}>Understanding photosynthesis</Text>
                        <Text style={styles.discussionMeta}>Posted by Priya • 5 hours ago</Text>
                        <View style={styles.discussionStats}>
                            <Text style={styles.discussionStat}>7 replies</Text>
                            <Text style={styles.discussionStat}>15 likes</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 12,
    },
    groupCard: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    groupHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    groupIcon: {
        fontSize: 40,
        marginRight: 12,
    },
    groupInfo: {
        flex: 1,
    },
    groupName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 2,
    },
    groupMembers: {
        fontSize: 12,
        color: '#9ca3af',
    },
    joinButton: {
        backgroundColor: '#6366f1',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 8,
    },
    joinButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ffffff',
    },
    discussionCard: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    discussionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 8,
    },
    discussionMeta: {
        fontSize: 12,
        color: '#9ca3af',
        marginBottom: 12,
    },
    discussionStats: {
        flexDirection: 'row',
        gap: 16,
    },
    discussionStat: {
        fontSize: 12,
        color: '#6b7280',
    },
});
