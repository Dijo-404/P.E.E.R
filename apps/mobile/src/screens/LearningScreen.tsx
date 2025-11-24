import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LearningScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <Text style={styles.title}>Learning</Text>
                    <Text style={styles.subtitle}>Choose a subject to continue</Text>
                </View>

                <View style={styles.subjectsContainer}>
                    <TouchableOpacity style={[styles.subjectCard, { backgroundColor: '#dbeafe' }]}>
                        <Text style={styles.subjectIcon}></Text>
                        <Text style={styles.subjectTitle}>Mathematics</Text>
                        <Text style={styles.subjectProgress}>8/12 chapters</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.subjectCard, { backgroundColor: '#dcfce7' }]}>
                        <Text style={styles.subjectIcon}></Text>
                        <Text style={styles.subjectTitle}>Science</Text>
                        <Text style={styles.subjectProgress}>5/10 chapters</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.subjectCard, { backgroundColor: '#fef3c7' }]}>
                        <Text style={styles.subjectIcon}></Text>
                        <Text style={styles.subjectTitle}>English</Text>
                        <Text style={styles.subjectProgress}>6/8 chapters</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.subjectCard, { backgroundColor: '#fce7f3' }]}>
                        <Text style={styles.subjectIcon}></Text>
                        <Text style={styles.subjectTitle}>Social Studies</Text>
                        <Text style={styles.subjectProgress}>3/9 chapters</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recommended for You</Text>
                    <View style={styles.lessonCard}>
                        <View style={styles.lessonHeader}>
                            <Text style={styles.lessonBadge}>Mathematics</Text>
                            <Text style={styles.lessonDuration}>15 min</Text>
                        </View>
                        <Text style={styles.lessonTitle}>Understanding Fractions</Text>
                        <Text style={styles.lessonDescription}>
                            Learn the basics of fractions and how to add them
                        </Text>
                    </View>

                    <View style={styles.lessonCard}>
                        <View style={styles.lessonHeader}>
                            <Text style={styles.lessonBadge}>Science</Text>
                            <Text style={styles.lessonDuration}>20 min</Text>
                        </View>
                        <Text style={styles.lessonTitle}>The Water Cycle</Text>
                        <Text style={styles.lessonDescription}>
                            Explore how water moves through our environment
                        </Text>
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
    subjectsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 12,
        gap: 12,
    },
    subjectCard: {
        width: '47%',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
    },
    subjectIcon: {
        fontSize: 48,
        marginBottom: 8,
    },
    subjectTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 4,
    },
    subjectProgress: {
        fontSize: 14,
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
    lessonCard: {
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
    lessonHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    lessonBadge: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6366f1',
        backgroundColor: '#eef2ff',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    lessonDuration: {
        fontSize: 12,
        color: '#9ca3af',
    },
    lessonTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 4,
    },
    lessonDescription: {
        fontSize: 14,
        color: '#6b7280',
        lineHeight: 20,
    },
});
