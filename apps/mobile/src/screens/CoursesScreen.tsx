import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CoursesScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <Text style={styles.title}>Courses</Text>
                    <Text style={styles.subtitle}>Browse all available courses</Text>
                </View>

                <View style={styles.coursesContainer}>
                    <View style={styles.courseCard}>
                        <View style={styles.courseBadge}>
                            <Text style={styles.courseBadgeText}>Class 6</Text>
                        </View>
                        <Text style={styles.courseTitle}>Mathematics Fundamentals</Text>
                        <Text style={styles.courseDescription}>
                            Master the basics of mathematics including algebra, geometry, and arithmetic
                        </Text>
                        <View style={styles.courseFooter}>
                            <Text style={styles.courseStats}>12 Chapters • 45 Lessons</Text>
                            <TouchableOpacity style={styles.enrollButton}>
                                <Text style={styles.enrollButtonText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.courseCard}>
                        <View style={styles.courseBadge}>
                            <Text style={styles.courseBadgeText}>Class 6</Text>
                        </View>
                        <Text style={styles.courseTitle}>Science Exploration</Text>
                        <Text style={styles.courseDescription}>
                            Discover the wonders of science through interactive lessons and experiments
                        </Text>
                        <View style={styles.courseFooter}>
                            <Text style={styles.courseStats}>10 Chapters • 38 Lessons</Text>
                            <TouchableOpacity style={styles.enrollButton}>
                                <Text style={styles.enrollButtonText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.courseCard}>
                        <View style={styles.courseBadge}>
                            <Text style={styles.courseBadgeText}>Class 6</Text>
                        </View>
                        <Text style={styles.courseTitle}>English Language</Text>
                        <Text style={styles.courseDescription}>
                            Improve your reading, writing, and communication skills
                        </Text>
                        <View style={styles.courseFooter}>
                            <Text style={styles.courseStats}>8 Chapters • 32 Lessons</Text>
                            <TouchableOpacity style={styles.enrollButton}>
                                <Text style={styles.enrollButtonText}>Start</Text>
                            </TouchableOpacity>
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
    coursesContainer: {
        padding: 16,
    },
    courseCard: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    courseBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#eef2ff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginBottom: 12,
    },
    courseBadgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6366f1',
    },
    courseTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 8,
    },
    courseDescription: {
        fontSize: 14,
        color: '#6b7280',
        lineHeight: 20,
        marginBottom: 16,
    },
    courseFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    courseStats: {
        fontSize: 12,
        color: '#9ca3af',
    },
    enrollButton: {
        backgroundColor: '#6366f1',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    enrollButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ffffff',
    },
});
