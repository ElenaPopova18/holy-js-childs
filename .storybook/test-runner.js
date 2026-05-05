module.exports = {
  async postVisit(page) {
    // Wait for the story to render and coverage to be collected
    await page.waitForLoadState('networkidle');
  },
};
