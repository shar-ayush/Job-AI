// styles/home.styles.js
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "JetBrainsMono-Medium",
    letterSpacing: 0.5,
    color: COLORS.primary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  bookCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    marginBottom: 20,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bookHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  username: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  bookImageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: COLORS.border,
  },
  bookImage: {
    width: "100%",
    height: "100%",
  },
  bookDetails: {
    padding: 4,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  caption: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 8,
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  footerLoader: {
    marginVertical: 20,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: COLORS.placeholderText,
  },
  score: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  smallAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  sectionSub: {
    fontSize: 12,
    color: COLORS.placeholderText,
  },
  carousel: {
    paddingVertical: 8,
    paddingLeft: 2,
    paddingRight: 8,
  },
  recoCard: {
    width: 220,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  recoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  recoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  aiBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  aiBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  recoCompany: {
    fontSize: 13,
    color: COLORS.placeholderText,
    marginBottom: 6,
  },
  smallText: {
    fontSize: 13,
    color: COLORS.placeholderText,
  },
  skillWidget: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  skillTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  skillSubtitle: {
    fontSize: 13,
    color: COLORS.placeholderText,
    marginBottom: 8,
  },
  skillList: {
    flexDirection: 'row',
    gap: 8,
  },
  skillChip: {
    backgroundColor: COLORS.inputBackground,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  jobCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  jobRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobLogoPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    color: COLORS.placeholderText,
    fontSize: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  matchWrap: {
    alignItems: 'flex-end',
  },
  matchText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  // New button / action styles
  primaryButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.textDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
    marginBottom: 8,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  secondaryButtonText: {
    color: COLORS.textDark,
    fontWeight: '600',
  },
  suggestButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestButtonText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  skillListRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillChipText: {
    color: COLORS.textDark,
    fontSize: 13,
  },
  tagChip: {
    backgroundColor: COLORS.inputBackground,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
  },
  tagText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 12,
  },
});

export default styles;
