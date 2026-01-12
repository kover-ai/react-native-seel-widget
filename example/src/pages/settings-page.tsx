import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DomainEnum } from '../../../src/ui/seel-wfp-info-view';

export enum OptOutExpiredTimeEnum {
  OneMinute = 6e4,
  TwoMinutes = 12e4,
  OneHour = 36e5,
  OneYear = 365 * 24 * 36e5,
  Default = OptOutExpiredTimeEnum.OneYear,
}

export type OptOutExpiredTime =
  | number
  | (typeof OptOutExpiredTimeEnum)[keyof typeof OptOutExpiredTimeEnum];

interface ISettingsConfig {
  defaultOptedIn: boolean;
  domain: DomainEnum;
  optOutExpiredTime?: OptOutExpiredTime;
}

interface SettingsPageProps {
  onSave?: () => void;
  onChangeConfig?: (config: ISettingsConfig) => void;
}

export default function SettingsPage({
  onSave = () => {},
  onChangeConfig = (_: ISettingsConfig) => {},
  defaultOptedIn = false,
  domain = DomainEnum.US,
  optOutExpiredTime = OptOutExpiredTimeEnum.OneMinute,
}: SettingsPageProps & ISettingsConfig) {
  const [settings, setSettings] = useState<ISettingsConfig>({
    defaultOptedIn,
    domain,
    optOutExpiredTime,
  });

  const onChangeSettings = (config: ISettingsConfig) => {
    setSettings(config);
    onChangeConfig(config);
  };

  const handleSave = () => {
    // Logic to save settings
    console.log('Settings saved:', settings);
    onSave?.();
  };

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        style={defaultStyles.scrollView}
        contentContainerStyle={defaultStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={defaultStyles.section}>
          <Text style={defaultStyles.sectionTitle}>Worry-Free Purchase</Text>
          <View style={defaultStyles.settingItem}>
            <Text style={defaultStyles.settingLabel}>Default Opted-In</Text>
            <TouchableOpacity
              style={[
                defaultStyles.toggle,
                settings.defaultOptedIn && defaultStyles.toggleActive,
              ]}
              onPress={() =>
                onChangeSettings({
                  ...settings,
                  defaultOptedIn: !settings.defaultOptedIn,
                })
              }
            >
              <View
                style={[
                  defaultStyles.toggleThumb,
                  settings.defaultOptedIn && defaultStyles.toggleThumbActive,
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={defaultStyles.section}>
          <Text style={defaultStyles.sectionTitle}>Country or Domain</Text>
          <View style={defaultStyles.settingItem}>
            <Text style={defaultStyles.settingLabel}>US</Text>
            <TouchableOpacity
              style={[
                defaultStyles.radioButton,
                settings.domain === 'US' && defaultStyles.radioButtonActive,
              ]}
              onPress={() => {
                onChangeSettings({ ...settings, domain: DomainEnum.US });
              }}
            >
              {settings.domain === DomainEnum.US ? (
                <View style={defaultStyles.radioDot} />
              ) : null}
            </TouchableOpacity>
          </View>
          <View style={defaultStyles.settingItem}>
            <Text style={defaultStyles.settingLabel}>EU</Text>
            <TouchableOpacity
              style={[
                defaultStyles.radioButton,
                settings.domain === DomainEnum.EU &&
                  defaultStyles.radioButtonActive,
              ]}
              onPress={() => {
                onChangeSettings({ ...settings, domain: DomainEnum.EU });
              }}
            >
              {settings.domain === DomainEnum.EU ? (
                <View style={defaultStyles.radioDot} />
              ) : null}
            </TouchableOpacity>
          </View>
        </View>

        <View style={defaultStyles.section}>
          <Text style={defaultStyles.sectionTitle}>Opt Out Expired Time</Text>
          <View style={defaultStyles.settingItem}>
            <Text style={defaultStyles.settingLabel}>One Minute</Text>
            <TouchableOpacity
              style={[
                defaultStyles.radioButton,
                settings.optOutExpiredTime ===
                  OptOutExpiredTimeEnum.OneMinute &&
                  defaultStyles.radioButtonActive,
              ]}
              onPress={() => {
                onChangeSettings({
                  ...settings,
                  optOutExpiredTime: OptOutExpiredTimeEnum.OneMinute,
                });
              }}
            >
              {settings.optOutExpiredTime ===
              OptOutExpiredTimeEnum.OneMinute ? (
                <View style={defaultStyles.radioDot} />
              ) : null}
            </TouchableOpacity>
          </View>
          <View style={defaultStyles.settingItem}>
            <Text style={defaultStyles.settingLabel}>Two Minutes</Text>
            <TouchableOpacity
              style={[
                defaultStyles.radioButton,
                settings.optOutExpiredTime ===
                  OptOutExpiredTimeEnum.TwoMinutes &&
                  defaultStyles.radioButtonActive,
              ]}
              onPress={() => {
                onChangeSettings({
                  ...settings,
                  optOutExpiredTime: OptOutExpiredTimeEnum.TwoMinutes,
                });
              }}
            >
              {settings.optOutExpiredTime ===
              OptOutExpiredTimeEnum.TwoMinutes ? (
                <View style={defaultStyles.radioDot} />
              ) : null}
            </TouchableOpacity>
          </View>

          <View style={defaultStyles.settingItem}>
            <Text style={defaultStyles.settingLabel}>One Hour</Text>
            <TouchableOpacity
              style={[
                defaultStyles.radioButton,
                settings.optOutExpiredTime === OptOutExpiredTimeEnum.OneHour &&
                  defaultStyles.radioButtonActive,
              ]}
              onPress={() => {
                onChangeSettings({
                  ...settings,
                  optOutExpiredTime: OptOutExpiredTimeEnum.OneHour,
                });
              }}
            >
              {settings.optOutExpiredTime === OptOutExpiredTimeEnum.OneHour ? (
                <View style={defaultStyles.radioDot} />
              ) : null}
            </TouchableOpacity>
          </View>

          <View style={defaultStyles.settingItem}>
            <Text style={defaultStyles.settingLabel}>One Year</Text>
            <TouchableOpacity
              style={[
                defaultStyles.radioButton,
                settings.optOutExpiredTime === OptOutExpiredTimeEnum.OneYear &&
                  defaultStyles.radioButtonActive,
              ]}
              onPress={() => {
                onChangeSettings({
                  ...settings,
                  optOutExpiredTime: OptOutExpiredTimeEnum.OneYear,
                });
              }}
            >
              {settings.optOutExpiredTime === OptOutExpiredTimeEnum.OneYear ? (
                <View style={defaultStyles.radioDot} />
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={defaultStyles.footer}>
        <TouchableOpacity style={defaultStyles.saveButton} onPress={handleSave}>
          <Text style={defaultStyles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 15,
    color: '#333333',
    flex: 1,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#615BFB',
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonActive: {
    borderColor: '#615BFB',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#615BFB',
  },
  footer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    padding: 16,
    paddingBottom: 20,
  },
  saveButton: {
    backgroundColor: '#615BFB',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
