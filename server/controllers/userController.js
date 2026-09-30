const Assessment = require('../models/Assessment');

/**
 * GET /api/user/:userId/dashboard
 * Returns overall stats, assessment history, average ability, and learning progress for a user
 */
exports.getUserDashboard = async (req, res) => {
  try {
    const { userId } = req.params;

    const assessments = await Assessment.find({ userId }).sort({ createdAt: -1 });

    if (assessments.length === 0) {
      return res.status(200).json({
        userId,
        totalAssessmentsCompleted: 0,
        averageAbility: 0.50,
        recentAssessments: [],
        weakTopicsOverall: [],
        strongTopicsOverall: []
      });
    }

    const completedAssessments = assessments.filter(a => a.status === 'completed');
    const totalCompleted = completedAssessments.length;

    // Calculate average ability across completed assessments
    const totalAbility = completedAssessments.reduce((acc, curr) => acc + curr.ability, 0);
    const averageAbility = totalCompleted > 0 ? Number((totalAbility / totalCompleted).toFixed(2)) : 0.50;

    // Aggregate topic strengths and weaknesses across all question history
    const topicStats = {};

    assessments.forEach(assessment => {
      assessment.questionHistory.forEach(item => {
        if (!topicStats[item.topic]) {
          topicStats[item.topic] = { correct: 0, total: 0 };
        }
        topicStats[item.topic].total += 1;
        if (item.correct) {
          topicStats[item.topic].correct += 1;
        }
      });
    });

    const weakTopics = [];
    const strongTopics = [];

    Object.keys(topicStats).forEach(topic => {
      const stats = topicStats[topic];
      const accuracy = (stats.correct / stats.total) * 100;
      if (accuracy < 50) {
        weakTopics.push({ topic, accuracy: Number(accuracy.toFixed(1)) });
      } else {
        strongTopics.push({ topic, accuracy: Number(accuracy.toFixed(1)) });
      }
    });

    const recentAssessments = assessments.slice(0, 5).map(a => ({
      assessmentId: a._id,
      subject: a.subject || 'DSA',
      finalAbility: a.ability,
      status: a.status,
      totalQuestions: a.questionHistory.length,
      startedAt: a.startedAt,
      completedAt: a.completedAt
    }));

    res.status(200).json({
      userId,
      totalAssessmentsCompleted: totalCompleted,
      averageAbility,
      recentAssessments,
      weakTopicsOverall: weakTopics,
      strongTopicsOverall: strongTopics
    });
  } catch (error) {
    console.error('Error fetching user dashboard:', error);
    res.status(500).json({ error: 'Failed to retrieve user dashboard' });
  }
};
