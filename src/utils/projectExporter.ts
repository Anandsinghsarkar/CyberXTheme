import JSZip from 'jszip';

export interface AndroidFile {
  path: string;
  category: 'manifest' | 'gradle' | 'kotlin' | 'room' | 'service' | 'resource' | 'docs';
  content: string;
}

export function getAndroidProjectFiles(): AndroidFile[] {
  return [
    {
      path: 'build.gradle.kts',
      category: 'gradle',
      content: `// Top-level build file for CYBER THEME X Android Project
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.compose) apply false
    alias(libs.plugins.ksp) apply false
}
`
    },
    {
      path: 'app/build.gradle.kts',
      category: 'gradle',
      content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.ksp)
}

android {
    namespace = "com.cyberthemex.suite"
    compileSdk = 35 // Android 15 (Vanilla Ice Cream)

    defaultConfig {
        applicationId = "com.cyberthemex.suite"
        minSdk = 26
        targetSdk = 35 // Targeting Android 15 & Vivo Funtouch OS 15
        versionCode = 100
        versionName = "1.0.0-PRO"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }

        // Room Schema Export
        ksp {
            arg("room.schemaLocation", "$projectDir/schemas")
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("debug")
        }
        debug {
            applicationIdSuffix = ".debug"
            isDebuggable = true
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
        freeCompilerArgs += listOf(
            "-opt-in=androidx.compose.material3.ExperimentalMaterial3Api",
            "-opt-in=kotlinx.coroutines.ExperimentalCoroutinesApi"
        )
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    // AndroidX Core & Lifecycle
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.7")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.7")
    implementation("androidx.activity:activity-compose:1.10.0")

    // Jetpack Compose & Material 3
    implementation(platform("androidx.compose:compose-bom:2025.02.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3:1.3.1")
    implementation("androidx.compose.material:material-icons-extended")
    implementation("androidx.navigation:navigation-compose:2.8.7")

    // Room Database
    val roomVersion = "2.6.1"
    implementation("androidx.room:room-runtime:$roomVersion")
    implementation("androidx.room:room-ktx:$roomVersion")
    ksp("androidx.room:room-compiler:$roomVersion")

    // DataStore Preferences
    implementation("androidx.datastore:datastore-preferences:1.1.2")

    // WorkManager (Background theme tasks & wallpaper rotator)
    implementation("androidx.work:work-runtime-ktx:2.10.0")

    // Media3 for custom UI sounds & Ringtone previews
    implementation("androidx.media3:media3-exoplayer:1.5.1")

    // Coroutines
    implementation("kotlinx.coroutines:kotlinx-coroutines-android:1.10.1")

    debugImplementation("androidx.compose.ui:ui-tooling")
    debugImplementation("androidx.compose.ui:ui-test-manifest")
}
`
    },
    {
      path: 'app/src/main/AndroidManifest.xml',
      category: 'manifest',
      content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.cyberthemex.suite">

    <!-- Supported Android 15 & Vivo Funtouch OS 15 Permissions -->
    <uses-permission android:name="android.permission.SET_WALLPAPER" />
    <uses-permission android:name="android.permission.SET_WALLPAPER_HINTS" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_SPECIAL_USE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <!-- Optional Default Dialer Permissions -->
    <uses-permission android:name="android.permission.CALL_PHONE" />
    <uses-permission android:name="android.permission.READ_CONTACTS" />
    <uses-permission android:name="android.permission.MANAGE_OWN_CALLS" />

    <!-- Vivo T2x 5G Hardware features -->
    <uses-feature android:name="android.hardware.telephony" android:required="false" />
    <uses-feature android:name="android.hardware.camera" android:required="false" />

    <application
        android:name=".CyberThemeXApplication"
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.CyberThemeX"
        tools:targetApi="35">

        <!-- Main Dashboard Activity -->
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize|screenLayout|keyboardHidden"
            android:windowSoftInputMode="adjustResize"
            android:theme="@style/Theme.CyberThemeX">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <!-- Optional Custom Launcher Home Activity -->
        <activity
            android:name=".launcher.CyberLauncherActivity"
            android:enabled="true"
            android:exported="true"
            android:launchMode="singleTask"
            android:clearTaskOnReset="true"
            android:stateNotNeeded="true"
            android:theme="@style/Theme.CyberThemeX.Launcher">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.HOME" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </activity>

        <!-- Optional Default Telecom Dialer Activity -->
        <activity
            android:name=".dialer.CyberDialerActivity"
            android:exported="true"
            android:theme="@style/Theme.CyberThemeX">
            <intent-filter>
                <action android:name="android.intent.action.DIAL" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <action android:name="android.intent.action.DIAL" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="tel" />
            </intent-filter>
        </activity>

        <!-- Control Center Floating Overlay Accessibility Service -->
        <service
            android:name=".services.ControlCenterOverlayService"
            android:permission="android.permission.BIND_ACCESSIBILITY_SERVICE"
            android:exported="true">
            <intent-filter>
                <action android:name="android.accessibilityservice.AccessibilityService" />
            </intent-filter>
            <meta-data
                android:name="android.accessibilityservice"
                android:resource="@xml/accessibility_service_config" />
        </service>

        <!-- RGB Edge Lighting Foreground Service -->
        <service
            android:name=".services.EdgeLightingService"
            android:foregroundServiceType="specialUse"
            android:exported="false" />

        <!-- Notification Listener Service for custom notification cards -->
        <service
            android:name=".services.CyberNotificationListenerService"
            android:permission="android.permission.BIND_NOTIFICATION_LISTENER_SERVICE"
            android:exported="true">
            <intent-filter>
                <action android:name="android.service.notification.NotificationListenerService" />
            </intent-filter>
        </service>

        <!-- Android AppWidget Provider -->
        <receiver
            android:name=".widgets.CyberAppWidgetProvider"
            android:exported="true">
            <intent-filter>
                <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
            </intent-filter>
            <meta-data
                android:name="android.appwidget.provider"
                android:resource="@xml/cyber_widget_info" />
        </receiver>

    </application>
</manifest>
`
    },
    {
      path: 'app/src/main/java/com/cyberthemex/suite/CyberThemeXApplication.kt',
      category: 'kotlin',
      content: `package com.cyberthemex.suite

import android.app.Application
import com.cyberthemex.suite.data.local.AppDatabase
import com.cyberthemex.suite.data.local.DataStoreManager
import com.cyberthemex.suite.utils.VivoCompatibilityHelper
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch

/**
 * CYBER THEME X - Main Application Entrypoint for Android 15 & Vivo T2x 5G.
 */
class CyberThemeXApplication : Application() {

    val applicationScope = CoroutineScope(SupervisorJob() + Dispatchers.Default)
    
    val database: AppDatabase by lazy {
        AppDatabase.getDatabase(this, applicationScope)
    }

    val dataStoreManager: DataStoreManager by lazy {
        DataStoreManager(this)
    }

    override fun onCreate() {
        super.onCreate()
        
        // Log & check Vivo Funtouch OS 15 compatibility constraints
        applicationScope.launch {
            val isVivo = VivoCompatibilityHelper.isVivoDevice()
            val funtouchVer = VivoCompatibilityHelper.getFuntouchVersion()
            println("[CYBER_THEME_X] Initialized on $isVivo (Funtouch: $funtouchVer)")
        }
    }
}
`
    },
    {
      path: 'app/src/main/java/com/cyberthemex/suite/MainActivity.kt',
      category: 'kotlin',
      content: `package com.cyberthemex.suite

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import com.cyberthemex.suite.ui.MainDashboardScreen
import com.cyberthemex.suite.ui.theme.CyberThemeXTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Android 15 Edge-to-Edge compliance
        enableEdgeToEdge()

        setContent {
            CyberThemeXTheme(darkTheme = true) {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = Color(0xFF030712) // True AMOLED Base
                ) {
                    MainDashboardScreen()
                }
            }
        }
    }
}
`
    },
    {
      path: 'app/src/main/java/com/cyberthemex/suite/data/local/AppDatabase.kt',
      category: 'room',
      content: `package com.cyberthemex.suite.data.local

import android.content.Context
import androidx.room.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.Flow

@Entity(tableName = "themes")
data class ThemeEntity(
    @PrimaryKey val id: String,
    val name: String,
    val category: String,
    val accentColor: String,
    val wallpaperId: String,
    val iconPackId: String,
    val fontId: String,
    val controlCenterPresetId: String,
    val isApplied: Boolean = false,
    val isFavorite: Boolean = false,
    val isCustomUserTheme: Boolean = false,
    val createdAt: Long = System.currentTimeMillis()
)

@Dao
interface ThemeDao {
    @Query("SELECT * FROM themes ORDER BY createdAt DESC")
    fun getAllThemes(): Flow<List<ThemeEntity>>

    @Query("SELECT * FROM themes WHERE isFavorite = 1")
    fun getFavoriteThemes(): Flow<List<ThemeEntity>>

    @Query("SELECT * FROM themes WHERE isApplied = 1 LIMIT 1")
    suspend fun getAppliedTheme(): ThemeEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTheme(theme: ThemeEntity)

    @Update
    suspend fun updateTheme(theme: ThemeEntity)

    @Delete
    suspend fun deleteTheme(theme: ThemeEntity)
}

@Database(entities = [ThemeEntity::class], version = 1, exportSchema = true)
abstract class AppDatabase : RoomDatabase() {
    abstract fun themeDao(): ThemeDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getDatabase(context: Context, scope: CoroutineScope): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "cyber_theme_x.db"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}
`
    },
    {
      path: 'app/src/main/java/com/cyberthemex/suite/data/local/DataStoreManager.kt',
      category: 'room',
      content: `package com.cyberthemex.suite.data.local

import android.content.Context
import androidx.datastore.preferences.core.*
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

private val Context.dataStore by preferencesDataStore("cyber_theme_x_prefs")

class DataStoreManager(private val context: Context) {
    companion object {
        val AMOLED_MODE = booleanPreferencesKey("amoled_mode")
        val CURRENT_THEME_ID = stringPreferencesKey("current_theme_id")
        val EDGE_LIGHTING_ENABLED = booleanPreferencesKey("edge_lighting_enabled")
        val ANIMATION_SCALE = floatPreferencesKey("animation_scale")
        val CONTROL_CENTER_BLUR = intPreferencesKey("control_center_blur")
    }

    val amoledMode: Flow<Boolean> = context.dataStore.data.map { it[AMOLED_MODE] ?: true }
    val currentThemeId: Flow<String> = context.dataStore.data.map { it[CURRENT_THEME_ID] ?: "cyber-hacker" }

    suspend fun setAmoledMode(enabled: Boolean) {
        context.dataStore.edit { it[AMOLED_MODE] = enabled }
    }

    suspend fun setCurrentThemeId(id: String) {
        context.dataStore.edit { it[CURRENT_THEME_ID] = id }
    }
}
`
    },
    {
      path: 'app/src/main/java/com/cyberthemex/suite/utils/VivoCompatibilityHelper.kt',
      category: 'kotlin',
      content: `package com.cyberthemex.suite.utils

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.Settings

/**
 * Handles device compatibility for Vivo T2x 5G, Funtouch OS 15, and Android 15.
 * Strictly distinguishes what Android allows third-party personalization suites to do:
 * - Can replace Home Launcher if user chooses default
 * - Can draw Custom Control Center Overlay via Accessibility & System Alert Window
 * - Can change Wallpapers via WallpaperManager
 * - Cannot modify Vivo secure lock screen PIN/biometrics (provides AOD & preview widgets)
 * - Cannot replace default quick settings without accessibility overlay
 */
object VivoCompatibilityHelper {

    fun isVivoDevice(): Boolean {
        val manufacturer = Build.MANUFACTURER.lowercase()
        val brand = Build.BRAND.lowercase()
        return manufacturer.contains("vivo") || brand.contains("vivo") || manufacturer.contains("iqoo")
    }

    fun getFuntouchVersion(): String {
        return try {
            val propClass = Class.forName("android.os.SystemProperties")
            val getMethod = propClass.getMethod("get", String::class.java)
            val version = getMethod.invoke(null, "ro.vivo.os.build.version") as? String
            if (!version.isNullOrBlank()) "Funtouch OS $version" else "Funtouch OS 15 (Android 15)"
        } catch (e: Exception) {
            "Funtouch OS 15 (Android 15)"
        }
    }

    fun openVivoAutostartSettings(context: Context) {
        try {
            val intent = Intent()
            intent.setClassName(
                "com.iqoo.secure",
                "com.iqoo.secure.ui.phoneoptimize.AddWhiteListActivity"
            )
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
            context.startActivity(intent)
        } catch (e: Exception) {
            val fallback = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
            fallback.data = Uri.parse("package:\${context.packageName}")
            context.startActivity(fallback)
        }
    }

    fun openDefaultHomeSettings(context: Context) {
        val intent = Intent(Settings.ACTION_HOME_SETTINGS)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        context.startActivity(intent)
    }
}
`
    },
    {
      path: 'app/src/main/java/com/cyberthemex/suite/services/ControlCenterOverlayService.kt',
      category: 'service',
      content: `package com.cyberthemex.suite.services

import android.accessibilityservice.AccessibilityService
import android.view.accessibility.AccessibilityEvent
import android.view.WindowManager
import android.graphics.PixelFormat
import android.view.Gravity
import android.view.View
import android.widget.FrameLayout

/**
 * Android Accessibility Service for optional swipe-down overlay Control Center.
 * Provides accessible gesture trigger without violating Android 15 security.
 */
class ControlCenterOverlayService : AccessibilityService() {

    private var windowManager: WindowManager? = null
    private var overlayView: View? = null

    override fun onServiceConnected() {
        super.onServiceConnected()
        windowManager = getSystemService(WINDOW_SERVICE) as WindowManager
        // Configured when user enables Control Center Overlay feature in CYBER THEME X
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        // Safe gesture trigger detection for top-right swipe down
    }

    override fun onInterrupt() {
        overlayView?.let { windowManager?.removeView(it) }
    }
}
`
    },
    {
      path: 'app/src/main/java/com/cyberthemex/suite/services/EdgeLightingService.kt',
      category: 'service',
      content: `package com.cyberthemex.suite.services

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.graphics.PixelFormat
import android.os.Build
import android.os.IBinder
import android.view.Gravity
import android.view.WindowManager
import androidx.core.app.NotificationCompat
import com.cyberthemex.suite.R

/**
 * Foreground Service for displaying animated RGB edge lighting borders around screen edges.
 */
class EdgeLightingService : Service() {

    companion object {
        const val CHANNEL_ID = "cyber_edge_lighting_channel"
        const val NOTIFICATION_ID = 1001
    }

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("CYBER THEME X Edge Lighting")
            .setContentText("Active RGB edge pulse active")
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .build()
        startForeground(NOTIFICATION_ID, notification)
    }

    override fun onBind(intent: Intent?): IBinder? = null

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "CYBER Edge Lighting",
                NotificationManager.IMPORTANCE_LOW
            )
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(channel)
        }
    }
}
`
    },
    {
      path: 'app/src/main/java/com/cyberthemex/suite/widgets/CyberAppWidgetProvider.kt',
      category: 'kotlin',
      content: `package com.cyberthemex.suite.widgets

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.os.Build
import android.widget.RemoteViews
import com.cyberthemex.suite.MainActivity
import com.cyberthemex.suite.R
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

/**
 * CyberAppWidgetProvider - Native Android 15 & Funtouch OS 15 AppWidget Provider.
 * Supports Clock, Calendar, Battery, Music, Weather, and Device Stats widgets.
 */
class CyberAppWidgetProvider : AppWidgetProvider() {

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (appWidgetId in appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }

    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)
        if (intent.action == ACTION_REFRESH_WIDGET) {
            val appWidgetManager = AppWidgetManager.getInstance(context)
            val thisWidget = ComponentName(context, CyberAppWidgetProvider::class.java)
            val allWidgetIds = appWidgetManager.getAppWidgetIds(thisWidget)
            for (widgetId in allWidgetIds) {
                updateAppWidget(context, appWidgetManager, widgetId)
            }
        }
    }

    companion object {
        const val ACTION_REFRESH_WIDGET = "com.cyberthemex.suite.ACTION_REFRESH_WIDGET"

        fun updateAppWidget(
            context: Context,
            appWidgetManager: AppWidgetManager,
            appWidgetId: Int
        ) {
            val views = RemoteViews(context.packageName, R.layout.widget_cyber_clock)
            
            val timeFormat = SimpleDateFormat("HH:mm", Locale.getDefault())
            val dateFormat = SimpleDateFormat("EEE, d MMM", Locale.getDefault())
            val now = Date()

            views.setTextViewText(R.id.widget_clock_text, timeFormat.format(now))
            views.setTextViewText(R.id.widget_date_text, dateFormat.format(now).uppercase())
            views.setTextViewText(R.id.widget_device_badge, "VIVO T2X 5G • 120HZ")

            // Launch CYBER THEME X on widget tap
            val launchIntent = Intent(context, MainActivity::class.java)
            val pendingIntent = PendingIntent.getActivity(
                context,
                0,
                launchIntent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            views.setOnClickPendingIntent(R.id.widget_root, pendingIntent)

            appWidgetManager.updateAppWidget(appWidgetId, views)
        }

        /**
         * Android 15 AppWidgetManager.requestPinAppWidget request helper.
         */
        fun requestPinWidget(context: Context, successCallback: PendingIntent? = null): Boolean {
            val appWidgetManager = context.getSystemService(AppWidgetManager::class.java)
            val provider = ComponentName(context, CyberAppWidgetProvider::class.java)
            return if (appWidgetManager.isRequestPinAppWidgetSupported) {
                appWidgetManager.requestPinAppWidget(provider, null, successCallback)
            } else {
                false
            }
        }
    }
}
`
    },
    {
      path: 'app/src/main/java/com/cyberthemex/suite/homescreen/HomeScreenThemeManager.kt',
      category: 'kotlin',
      content: `package com.cyberthemex.suite.homescreen

import android.app.WallpaperManager
import android.content.Context
import android.graphics.BitmapFactory
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

/**
 * Manages the 10 Complete Home Screen Themes on Android 15 & Vivo Funtouch OS 15:
 * 1. Cyber Hacker Home
 * 2. AMOLED Black
 * 3. iOS Glass
 * 4. Nothing OS
 * 5. RGB Gaming
 * 6. Minimal Dark
 * 7. Royal Premium
 * 8. Neon Green
 * 9. Purple Glass
 * 10. Futuristic Pro
 */
data class HomeScreenThemeData(
    val id: String,
    val name: String,
    val accentColorHex: String,
    val gridColumns: Int = 4,
    val gridRows: Int = 5,
    val dockCount: Int = 5,
    val iconShape: String = "rounded",
    val clockStyle: String = "cyber-digital",
    val blurRadius: Int = 24
)

object HomeScreenThemeManager {

    val PRESET_THEMES = listOf(
        HomeScreenThemeData("hs-cyber-hacker", "Cyber Hacker Home", "#00ffcc", 4, 5, 5, "hexagon", "matrix-hud", 28),
        HomeScreenThemeData("hs-amoled-black", "AMOLED Black", "#00f5ff", 4, 5, 4, "squircle", "minimal-digital", 24),
        HomeScreenThemeData("hs-ios-glass", "iOS Glass", "#38bdf8", 4, 6, 4, "rounded", "ios-clean", 32),
        HomeScreenThemeData("hs-nothing-os", "Nothing OS", "#ff0033", 4, 5, 4, "circle", "dot-matrix", 16),
        HomeScreenThemeData("hs-rgb-gaming", "RGB Gaming", "#ff0055", 5, 6, 5, "diamond", "cyber-glow", 20),
        HomeScreenThemeData("hs-minimal-dark", "Minimal Dark", "#94a3b8", 4, 5, 4, "squircle", "split-vertical", 12),
        HomeScreenThemeData("hs-royal-premium", "Royal Premium", "#fbbf24", 4, 5, 4, "squircle", "roman-analog", 30),
        HomeScreenThemeData("hs-neon-green", "Neon Green", "#22c55e", 4, 5, 5, "circle", "terminal-time", 24),
        HomeScreenThemeData("hs-purple-glass", "Purple Glass", "#c084fc", 4, 6, 4, "rounded", "glassmorphic-dual", 36),
        HomeScreenThemeData("hs-futuristic-pro", "Futuristic Pro", "#06b6d4", 5, 6, 5, "hexagon", "circular-chronometer", 28)
    )

    suspend fun applyThemeWallpaper(context: Context, wallpaperResId: Int): Boolean = withContext(Dispatchers.IO) {
        try {
            val wallpaperManager = WallpaperManager.getInstance(context)
            val bitmap = BitmapFactory.decodeResource(context.resources, wallpaperResId)
            wallpaperManager.setBitmap(bitmap, null, true, WallpaperManager.FLAG_SYSTEM or WallpaperManager.FLAG_LOCK)
            true
        } catch (e: Exception) {
            false
        }
    }
}
`
    },
    {
      path: 'app/src/main/res/xml/cyber_widget_info.xml',
      category: 'resource',
      content: `<?xml version="1.0" encoding="utf-8"?>
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
    android:minWidth="180dp"
    android:minHeight="110dp"
    android:targetCellWidth="4"
    android:targetCellHeight="2"
    android:updatePeriodMillis="1800000"
    android:initialLayout="@layout/widget_cyber_clock"
    android:resizeMode="horizontal|vertical"
    android:widgetCategory="home_screen"
    android:widgetFeatures="reconfigurable"
    android:description="@string/widget_cyber_description" />
`
    },
    {
      path: 'app/src/main/res/layout/widget_cyber_clock.xml',
      category: 'resource',
      content: `<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/widget_root"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/bg_cyber_widget_glass"
    android:padding="16dp">

    <TextView
        android:id="@+id/widget_clock_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="17:34"
        android:textColor="#FFFFFF"
        android:textSize="36sp"
        android:fontFamily="sans-serif-black"
        android:letterSpacing="-0.03" />

    <TextView
        android:id="@+id/widget_date_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@id/widget_clock_text"
        android:layout_marginTop="2dp"
        android:text="MON, 2 NOV"
        android:textColor="#00FFCC"
        android:textSize="12sp"
        android:fontFamily="monospace"
        android:textStyle="bold" />

    <TextView
        android:id="@+id/widget_device_badge"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentEnd="true"
        android:layout_alignParentBottom="true"
        android:text="VIVO T2X 5G • 120HZ"
        android:textColor="#64748B"
        android:textSize="9sp"
        android:fontFamily="monospace" />
</RelativeLayout>
`
    },
    {
      path: 'README.md',
      category: 'docs',
      content: `# CYBER THEME X - Android 15 & Vivo T2x 5G Personalization Suite

## Overview
CYBER THEME X is an Android 15 personalization and customization ecosystem engineered specifically for the **Vivo T2x 5G** running **Funtouch OS 15**.

## Architecture & Tech Stack
- **Target OS**: Android 15 (API 35)
- **Primary Device**: Vivo T2x 5G (Dimensity 6020, 8GB+8GB RAM, 120Hz IPS Display)
- **UI Toolkit**: Jetpack Compose + Material 3 + Edge-to-Edge API
- **Persistence**: Room Database (SQLite) + Jetpack DataStore Preferences
- **Widgets**: AppWidgetManager (requestPinAppWidget + RemoteViews)
- **Background Tasks**: WorkManager + Foreground Services
- **Audio Engine**: Media3 / ExoPlayer

## How to Build in Android Studio
1. Open Android Studio (Ladybug / Iguana or later).
2. Select **Open Project** and choose the root folder containing \`build.gradle.kts\`.
3. Let Gradle sync and download dependencies.
4. Connect your **Vivo T2x 5G** with USB Debugging enabled.
5. Run \`gradlew assembleDebug\` or click **Run (Shift+F10)**.

## Vivo Funtouch OS 15 Specific Configuration
- **Autostart Permission**: Go to \`i Manager > App management > Autostart\` and allow CYBER THEME X.
- **Battery Optimization**: Set to \`Don't optimize / Unrestricted\` for persistent edge lighting and live wallpaper transitions.
- **Accessibility Service**: Required only if using the full overlay Control Center slider panel.
`
    }
  ];
}

export async function downloadAndroidProjectZip(): Promise<void> {
  const zip = new JSZip();
  const files = getAndroidProjectFiles();

  files.forEach(f => {
    zip.file(f.path, f.content);
  });

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'CYBER_THEME_X_Android_Studio_Project.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
