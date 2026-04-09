# 🎮 QUEST LOGGER - Gamer's Productivity Hub

A cyberpunk/gaming-themed productivity tracker with daily to-dos, habit tracking, and visual analytics. Built with vanilla JavaScript, featuring smooth animations and a distraction-free UI perfect for gamers.

## ✨ Features  

### 📜 Daily Quests (To-Do List)
- **Add, Edit, Delete Tasks** - Full CRUD functionality  
- **Priority Levels** - High (Legendary), Medium (Epic), Low (Common)  
- **XP System** - Earn XP for completing quests  
- **Checkbox Completion** - Satisfying click-to-complete with animations
- **Today's Focus** - Only shows tasks for the current day

### 🎮 Habit Tracker
- **Daily/Weekly Habits** - Track any frequency
- **Progress Bars** - Visual progress for each habit
- **Streak Counter** - See your consistency with 🔥 streak tracking   
- **Custom Icons** - Personalize with emojis
- **Increment/Reset** - Mark progress throughout the day

### 📊 Analytics & Graphs
- **Daily Completion Chart** - Line graph showing last 7 days
- **Weekly Habit Consistency** - Bar chart for all habits
- **Monthly Overview** - 30-day completion percentage
- **Real-time Updates** - Charts update as you complete tasks

### 📅 Calendar View
- **Visual History** - See past progress at a glance
- **Color-Coded Days** - 
  - 🟢 Green: 80-100% complete
  - 🔵 Blue: 50-79% complete
  - 🟣 Purple: 1-49% complete
  - ⚫ Gray: 0% complete
- **Month Navigation** - Browse through past months
- **Today Highlight** - Current day clearly marked

### 🎯 Stats Dashboard
- **Daily Progress** - Percentage of tasks completed today
- **Current Streak** - Days with 100% completion
- **Total XP** - Lifetime experience points earned
- **Weekly Average** - 7-day completion average

## 🚀 Getting Started

### Option 1: Open Directly
1. Double-click `index.html`
2. Opens in your default browser
3. Start adding quests and habits!

### Option 2: Live Server (Recommended)  
```bash
# If using VS Code with Live Server extension
1. Right-click index.html
2. Select "Open with Live Server"
3. Auto-refreshes on changes
```

### Option 3: Simple HTTP Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server)
npx http-server
```

Then open: `http://localhost:8000`

## 🎨 Gaming Theme Features

### Visual Effects
- ⭐ **Animated Starfield Background** - Parallax scrolling stars
- 💫 **Glow Effects** - Neon borders and shadows
- 🎯 **Hover Animations** - Interactive card transformations
- ✨ **Smooth Transitions** - Fluid tab switching and modal popups
- 🎊 **XP Gain Popup** - Celebratory notification on task completion

### Color Scheme
- **Primary**: Neon Green (#00ff88)
- **Secondary**: Neon Blue (#00d4ff)
- **Accent**: Neon Purple (#b24bf3)
- **Warning**: Neon Pink (#ff2e97)
- **Background**: Dark Space (#0a0e27)

### Typography
- **Headers**: Orbitron (futuristic, bold)
- **Body**: Rajdhani (clean, readable)

## 💾 Data Storage

All data is stored locally in your browser's `localStorage`:
- **tasks** - Your daily quests
- **habits** - Habit definitions and progress
- **dailyProgress** - Historical completion data
- **lifetimeXP** - Cumulative experience points

**Note**: Data persists across sessions but is tied to your browser. Clearing browser data will reset everything.

## 🎮 How to Use

### Adding a Quest
1. Click **"+ New Quest"** button
2. Enter quest name
3. Choose priority level
4. Set XP reward (default: 10)
5. Click **"Add Quest"**

### Completing a Quest
1. Click the checkbox next to any quest
2. Watch the XP gain animation! 🎉
3. Quest moves to completed state
4. Stats automatically update

### Creating a Habit
1. Go to **"Habits"** tab
2. Click **"+ New Habit"**
3. Enter habit name
4. Choose frequency (daily/weekly)
5. Set target (how many times)
6. Add an emoji icon
7. Click **"Create Habit"**

### Tracking Habit Progress
1. Click **"✓ Mark Complete"** each time you do the habit
2. Progress bar fills up
3. Reset daily/weekly as needed
4. Build your streak! 🔥

### Viewing Analytics
1. Click **"Analytics"** tab
2. See three interactive charts:
   - Daily completion trend
   - Habit consistency
   - Monthly overview
3. Charts auto-update with your progress

### Checking Calendar
1. Click **"Calendar"** tab
2. View color-coded days
3. Navigate months with ◀ ▶ buttons
4. Hover over days to see details

## 🛠️ Customization

### Changing Colors
Edit `styles.css` - `:root` section:
```css
:root {
    --neon-green: #00ff88;  /* Change primary color */
    --neon-blue: #00d4ff;   /* Change secondary color */
    --neon-purple: #b24bf3; /* Change accent color */
    /* ... more variables */
}
```

### Modifying XP Values
In the modal, default XP is 10. Common values:
- **Low Priority**: 5-10 XP
- **Medium Priority**: 10-20 XP
- **High Priority**: 20-30 XP

### Adding More Sample Data
Edit `script.js` - `initializeSampleData()` function

## 📱 Mobile Friendly

Fully responsive design:
- Adapts to all screen sizes
- Touch-friendly buttons
- Optimized layouts for phones/tablets
- Smooth scrolling
- No horizontal overflow

## 🔧 Technical Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern animations & grid/flexbox
- **Vanilla JavaScript** - No frameworks needed
- **Chart.js** - Beautiful, responsive charts
- **LocalStorage API** - Client-side data persistence
- **Google Fonts** - Orbitron & Rajdhani

## 📈 Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ⚠️ IE11 (Limited support)

## 🎯 Roadmap / Future Enhancements

Want to extend the app? Here are ideas:
- ☁️ Cloud sync (Firebase, Supabase)
- 🏆 Achievement system
- 📤 Export data (JSON/CSV)
- 🎨 Theme switcher (multiple color schemes)
- 🔔 Browser notifications
- ⏰ Pomodoro timer integration
- 👥 Social features (share streaks)
- 📊 More chart types (pie, radar)
- 🎵 Sound effects
- 🌙 Dark/Light mode toggle

## 🐛 Troubleshooting

### Data Not Saving?
- Check if browser allows localStorage
- Try a different browser
- Check browser's privacy settings

### Charts Not Showing?
- Ensure Chart.js CDN is loading
- Check browser console for errors
- Refresh the page

### Animations Laggy?
- Close other browser tabs
- Update your browser
- Reduce animations in CSS (optional)

## 📄 License

Free to use, modify, and distribute. Have fun and stay productive! 🎮

## 🙏 Credits

Created with ❤️ for gamers who want to level up their productivity!

**Fonts**: Google Fonts (Orbitron, Rajdhani)  
**Charts**: Chart.js  
**Icons**: Native Emojis

---

**Pro Tip**: Treat your daily tasks like game quests and watch your productivity soar! 🚀
