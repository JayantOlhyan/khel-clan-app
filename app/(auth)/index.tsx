import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  StyleSheet, 
  Platform 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore, UserRole } from '../../store/authStore';
import { LinearGradient } from 'expo-linear-gradient';
import { Flame, ArrowRight, ShieldCheck, Phone, Lock, ChevronLeft, User, Compass } from 'lucide-react-native';
import { Text } from 'react-native';

const { height } = Dimensions.get('window');

// PURE LANDING STYLE CONFIGURATION
const CORE_THEME = {
  white: '#FFFFFF',
  obsidian: '#0B0F0C',
  neonLime: '#CAFC05',
  slateGray: '#8A958E',
  borderLight: 'rgba(255, 255, 255, 0.12)',
  inputBg: 'rgba(255, 255, 255, 0.05)',
  fontFamily: Platform.OS === 'web' 
    ? '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    : 'System',
};

export default function AuthScreen() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'landing' | 'phone' | 'otp' | 'role'>('landing');
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const handleSendOtp = () => {
    if (phone.trim().length === 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = () => {
    if (otp.trim().length > 0) {
      setStep('role');
    }
  };

  const selectRole = (role: UserRole) => {
    setUser({ uid: 'mock-user', phoneNumber: `+91${phone}`, role });
    if (role === 'player') {
      router.replace('/(player)');
    } else {
      router.replace('/(coordinator)');
    }
  };

  return (
    <View style={styles.container}>
      {/* Cinematic Turf Background */}
      <Image 
        source={require('../../assets/images/nanobanana_turf.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Premium dark gradient covering the background */}
      <LinearGradient
        colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)', 'rgba(11,15,12,0.92)', '#0B0F0C']}
        style={styles.absoluteFill}
      />
      
      <View style={[styles.contentWrapper, step !== 'landing' ? styles.bgOverlay : null]}>
        
        {/* STEP 1: LANDING/WELCOME */}
        {step === 'landing' && (
          <View style={styles.landingContainer}>
            
            {/* Sleek Vector Badge Logo (No checkered grid artifacts!) */}
            <View style={styles.logoBadgeContainer}>
              <View style={styles.logoBadgeOuter}>
                <LinearGradient
                  colors={['rgba(252, 92, 5, 0.1)', 'rgba(202,252,5,0.05)']}
                  style={styles.absoluteFill}
                />
                <Flame color={CORE_THEME.neonLime} size={38} strokeWidth={2.2} fill={CORE_THEME.neonLime} />
              </View>
              {/* Decorative mini badge */}
              <View style={styles.logoMiniBadge}>
                <ShieldCheck color="#000000" size={10} strokeWidth={2.5} />
              </View>
            </View>

            {/* Glowing Text Label */}
            <View style={styles.brandTitleRow}>
              <Text style={styles.brandTitleBadge}>EST. 2023</Text>
              <Text style={styles.brandTitleText}>KHELCLAN</Text>
            </View>

            {/* High Contrast Heading (Bypasses broken text-white Tailwind mappings) */}
            <View style={{ marginTop: 24, alignItems: 'center' }}>
              <Text style={styles.headingMain}>
                JOIN YOUR NEAREST
              </Text>
              <Text style={[styles.headingMain, { color: CORE_THEME.neonLime, marginTop: 4 }]}>
                GAME TODAY
              </Text>
              <Text style={styles.subheading}>
                Connect with fellow sport enthusiasts, book premium courts, and track your matches instantly.
              </Text>
            </View>

            {/* Action Button */}
            <TouchableOpacity 
              activeOpacity={0.85}
              onPress={() => setStep('phone')}
              style={styles.primaryLimeBtn}
            >
              <Text style={styles.primaryLimeBtnText}>Get Started</Text>
              <ArrowRight color="#000000" size={16} strokeWidth={2.5} style={{ marginLeft: 8 }} />
            </TouchableOpacity>

          </View>
        )}

        {/* STEP 2: PHONE INPUT */}
        {step === 'phone' && (
          <View style={styles.formContainer}>
            
            {/* Header */}
            <TouchableOpacity onPress={() => setStep('landing')} style={styles.backBtnPill}>
              <ChevronLeft color={CORE_THEME.white} size={14} strokeWidth={2.5} />
              <Text style={styles.backBtnText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.formTitle}>Enter your Phone</Text>
            <Text style={styles.formSub}>Enter your mobile number to receive a verification OTP.</Text>

            {/* Input Row */}
            <View style={styles.inputWrapper}>
              <Phone color={CORE_THEME.slateGray} size={18} style={{ marginRight: 8 }} />
              <Text style={{ color: CORE_THEME.white, fontSize: 16, fontWeight: '700', fontFamily: CORE_THEME.fontFamily, marginRight: 8 }}>+91</Text>
              <View style={{ width: 1, height: 20, backgroundColor: 'rgba(255, 255, 255, 0.15)', marginRight: 12 }} />
              <TextInput 
                style={styles.textInput}
                value={phone}
                onChangeText={(text) => {
                  // Only allow digits 0-9 and limit to 10 characters
                  const cleanText = text.replace(/[^0-9]/g, '');
                  setPhone(cleanText);
                }}
                keyboardType="number-pad"
                placeholderTextColor={CORE_THEME.slateGray}
                placeholder="00000 00000"
                maxLength={10}
                autoFocus
              />
            </View>

            {/* Action Button */}
            <TouchableOpacity 
              activeOpacity={phone.length === 10 ? 0.85 : 1}
              onPress={handleSendOtp}
              style={[styles.primaryLimeBtn, phone.length !== 10 && { opacity: 0.5 }]}
              disabled={phone.length !== 10}
            >
              <Text style={styles.primaryLimeBtnText}>Continue</Text>
              <ArrowRight color="#000000" size={16} strokeWidth={2.5} style={{ marginLeft: 8 }} />
            </TouchableOpacity>

          </View>
        )}

        {/* STEP 3: OTP VERIFICATION */}
        {step === 'otp' && (
          <View style={styles.formContainer}>
            
            {/* Header */}
            <TouchableOpacity onPress={() => setStep('phone')} style={styles.backBtnPill}>
              <ChevronLeft color={CORE_THEME.white} size={14} strokeWidth={2.5} />
              <Text style={styles.backBtnText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.formTitle}>Verify OTP</Text>
            <Text style={styles.formSub}>We sent a code to <Text style={{ fontWeight: '800', color: CORE_THEME.white }}>+91 {phone}</Text></Text>

            {/* Input Row */}
            <View style={styles.inputWrapper}>
              <Lock color={CORE_THEME.slateGray} size={18} style={{ marginRight: 12 }} />
              <TextInput 
                style={[styles.textInput, styles.otpInput]}
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                placeholder="000000"
                placeholderTextColor="rgba(255,255,255,0.15)"
                maxLength={6}
                autoFocus
              />
            </View>

            {/* Verify Button */}
            <TouchableOpacity 
              activeOpacity={0.85}
              onPress={handleVerifyOtp}
              style={styles.primaryLimeBtn}
            >
              <Text style={styles.primaryLimeBtnText}>Verify & Login</Text>
              <ArrowRight color="#000000" size={16} strokeWidth={2.5} style={{ marginLeft: 8 }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.resendBtn}>
              <Text style={styles.resendBtnText}>Resend code</Text>
            </TouchableOpacity>

          </View>
        )}

        {/* STEP 4: CHOOSE ROLE */}
        {step === 'role' && (
          <View style={styles.roleContainer}>
            
            <Text style={styles.roleHeading}>CHOOSE YOUR ROLE</Text>
            <Text style={styles.roleSub}>Select how you would like to experience KhelClan.</Text>

            {/* Player Card */}
            <TouchableOpacity 
              activeOpacity={0.9}
              onPress={() => selectRole('player')}
              style={[styles.roleCard, styles.roleCardActive]}
            >
              <View style={styles.roleIconWrapperActive}>
                <Compass color="#000000" size={28} strokeWidth={2.5} />
              </View>
              <Text style={styles.roleCardTitleActive}>PLAYER</Text>
              <Text style={styles.roleCardDescActive}>I want to search fields, book slots, and compete in matches.</Text>
            </TouchableOpacity>

            {/* Coordinator Card */}
            <TouchableOpacity 
              activeOpacity={0.9}
              onPress={() => selectRole('coordinator')}
              style={styles.roleCard}
            >
              <View style={styles.roleIconWrapper}>
                <User color={CORE_THEME.white} size={28} strokeWidth={2.5} />
              </View>
              <Text style={styles.roleCardTitle}>COORDINATOR</Text>
              <Text style={styles.roleCardDesc}>I want to manage turfs, run match play, and upload actions.</Text>
            </TouchableOpacity>

          </View>
        )}

      </View>
    </View>
  );
}

// ============================================
// SLEEK, STABLE STYLE ARCHITECTURE
// ============================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CORE_THEME.obsidian,
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
  },
  absoluteFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    zIndex: 10,
  },
  bgOverlay: {
    backgroundColor: 'rgba(11, 15, 12, 0.4)',
  },

  // Welcome Step Styles
  landingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 28,
    paddingBottom: Platform.OS === 'web' ? 60 : 80,
    alignItems: 'center',
  },
  logoBadgeContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  logoBadgeOuter: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: 'rgba(202,252,5,0.06)',
    borderColor: 'rgba(202,252,5,0.22)',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: CORE_THEME.neonLime,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
  },
  logoMiniBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: CORE_THEME.neonLime,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  brandTitleBadge: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    color: CORE_THEME.slateGray,
    fontSize: 8.5,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    fontFamily: CORE_THEME.fontFamily,
  },
  brandTitleText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.5,
    fontFamily: CORE_THEME.fontFamily,
  },
  headingMain: {
    color: CORE_THEME.white,
    fontSize: 32,
    fontWeight: '900',
    fontStyle: 'italic',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    lineHeight: 32,
    textAlign: 'center',
    fontFamily: CORE_THEME.fontFamily,
  },
  subheading: {
    color: CORE_THEME.slateGray,
    textAlign: 'center',
    marginTop: 12,
    fontSize: 13,
    lineHeight: 20,
    maxWidth: 320,
    fontFamily: CORE_THEME.fontFamily,
  },
  primaryLimeBtn: {
    width: '100%',
    backgroundColor: CORE_THEME.neonLime,
    borderRadius: 16,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 36,
    shadowColor: CORE_THEME.neonLime,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  primaryLimeBtnText: {
    color: '#000000',
    fontWeight: '900',
    fontSize: 12.5,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontFamily: CORE_THEME.fontFamily,
  },

  // Form Screen generic styles
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  backBtnPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: CORE_THEME.borderLight,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 28,
  },
  backBtnText: {
    color: CORE_THEME.white,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginLeft: 4,
    fontFamily: CORE_THEME.fontFamily,
  },
  formTitle: {
    color: CORE_THEME.white,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
    fontFamily: CORE_THEME.fontFamily,
  },
  formSub: {
    color: CORE_THEME.slateGray,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
    marginBottom: 24,
    fontFamily: CORE_THEME.fontFamily,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CORE_THEME.inputBg,
    borderColor: CORE_THEME.borderLight,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 4,
  },
  textInput: {
    flex: 1,
    color: CORE_THEME.white,
    fontSize: 16,
    fontWeight: '600',
    outlineStyle: 'none' as any,
    fontFamily: CORE_THEME.fontFamily,
  },
  otpInput: {
    letterSpacing: 8,
    fontSize: 22,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  resendBtn: {
    marginTop: 16,
    alignSelf: 'center',
    paddingVertical: 8,
  },
  resendBtnText: {
    color: CORE_THEME.neonLime,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: CORE_THEME.fontFamily,
  },

  // Role Choosing Step Styles
  roleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  roleHeading: {
    color: CORE_THEME.white,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
    textAlign: 'center',
    fontFamily: CORE_THEME.fontFamily,
  },
  roleSub: {
    color: CORE_THEME.slateGray,
    fontSize: 12.5,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 32,
    fontFamily: CORE_THEME.fontFamily,
  },
  roleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1.5,
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  roleCardActive: {
    backgroundColor: 'rgba(202, 252, 5, 0.06)',
    borderColor: CORE_THEME.neonLime,
    borderWidth: 1.5,
    shadowColor: CORE_THEME.neonLime,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  roleIconWrapperActive: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: CORE_THEME.neonLime,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  roleIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  roleCardTitleActive: {
    color: CORE_THEME.neonLime,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
    fontFamily: CORE_THEME.fontFamily,
  },
  roleCardTitle: {
    color: CORE_THEME.white,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
    fontFamily: CORE_THEME.fontFamily,
  },
  roleCardDescActive: {
    color: 'rgba(255, 255, 255, 0.82)',
    fontSize: 11,
    lineHeight: 15,
    textAlign: 'center',
    marginTop: 6,
    fontFamily: CORE_THEME.fontFamily,
  },
  roleCardDesc: {
    color: CORE_THEME.slateGray,
    fontSize: 11,
    lineHeight: 15,
    textAlign: 'center',
    marginTop: 6,
    fontFamily: CORE_THEME.fontFamily,
  },
});
