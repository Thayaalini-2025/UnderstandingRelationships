import { useState, useEffect } from 'react';
import { Mic, Camera, Volume2, Bell, Check, X, AlertCircle } from 'lucide-react';
import { requestAllPermissions, checkPermissionStatus, type PermissionType } from '../utils/permissions';
import { useTranslation } from '../utils/translations';

interface PermissionRequestProps {
  onComplete: (granted: boolean) => void;
  onSkip?: () => void;
}

export function PermissionRequest({ onComplete, onSkip }: PermissionRequestProps) {
  const t = useTranslation();
  const [permissions, setPermissions] = useState<Record<PermissionType, { status: 'pending' | 'granted' | 'denied' | 'error', message?: string }>>({
    audio: { status: 'pending' },
    microphone: { status: 'pending' },
    camera: { status: 'pending' },
    notifications: { status: 'pending' }
  });
  const [isRequesting, setIsRequesting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check initial status
    const initialStatus = {
      audio: checkPermissionStatus('audio'),
      notifications: checkPermissionStatus('notifications'),
      camera: checkPermissionStatus('camera'),
      microphone: checkPermissionStatus('microphone')
    };

    setPermissions({
      audio: {
        status: initialStatus.audio.granted ? 'granted' : 'pending',
        message: initialStatus.audio.error
      },
      microphone: {
        status: initialStatus.microphone.prompt ? 'pending' : 'granted',
        message: initialStatus.microphone.error
      },
      camera: {
        status: initialStatus.camera.prompt ? 'pending' : 'granted',
        message: initialStatus.camera.error
      },
      notifications: {
        status: initialStatus.notifications.granted ? 'granted' : initialStatus.notifications.denied ? 'denied' : 'pending',
        message: initialStatus.notifications.error
      }
    });
  }, []);

  const handleRequestPermissions = async () => {
    setIsRequesting(true);
    
    try {
      const results = await requestAllPermissions();
      
      const newPermissions: typeof permissions = {
        audio: {
          status: results.audio.granted ? 'granted' : results.audio.denied ? 'denied' : 'error',
          message: results.audio.error
        },
        microphone: {
          status: results.microphone.granted ? 'granted' : results.microphone.denied ? 'denied' : 'error',
          message: results.microphone.error
        },
        camera: {
          status: results.camera.granted ? 'granted' : results.camera.denied ? 'denied' : 'error',
          message: results.camera.error
        },
        notifications: {
          status: results.notifications.granted ? 'granted' : results.notifications.denied ? 'denied' : 'error',
          message: results.notifications.error
        }
      };
      
      setPermissions(newPermissions);
      
      // Consider it successful if at least audio is granted (most important for the app)
      const hasAudio = results.audio.granted;
      setTimeout(() => {
        onComplete(hasAudio);
      }, 1500);
    } catch (error: any) {
      console.error('Error requesting permissions:', error);
      setIsRequesting(false);
    } finally {
      setIsRequesting(false);
    }
  };

  const getPermissionIcon = (type: PermissionType) => {
    switch (type) {
      case 'audio': return Volume2;
      case 'microphone': return Mic;
      case 'camera': return Camera;
      case 'notifications': return Bell;
    }
  };

  const getPermissionLabel = (type: PermissionType) => {
    switch (type) {
      case 'audio': return t.perm_audio;
      case 'microphone': return t.perm_mic;
      case 'camera': return t.perm_camera;
      case 'notifications': return t.perm_notifications;
      default: return type;
    }
  };

  const getStatusLabel = (status: string, message?: string) => {
    switch (status) {
      case 'granted': return t.status_granted;
      case 'denied': return t.status_denied;
      case 'error': return message || t.status_error;
      default: return t.status_pending;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'granted': return <Check className="w-5 h-5 text-green-500" />;
      case 'denied': return <X className="w-5 h-5 text-red-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-orange-500" />;
      default: return <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />;
    }
  };

  const allGranted = Object.values(permissions).every(p => p.status === 'granted');
  const hasAnyGranted = Object.values(permissions).some(p => p.status === 'granted');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.enableFeatures}</h2>
          <p className="text-gray-600">
            {t.permissionDesc}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {(Object.keys(permissions) as PermissionType[]).map((type) => {
            const Icon = getPermissionIcon(type);
            const permission = permissions[type];
            const status = permission.status;

            return (
              <div
                key={type}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                  status === 'granted'
                    ? 'bg-green-50 border-green-300'
                    : status === 'denied'
                    ? 'bg-red-50 border-red-300'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${
                    status === 'granted'
                      ? 'bg-green-100'
                      : status === 'denied'
                      ? 'bg-red-100'
                      : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      status === 'granted'
                        ? 'text-green-600'
                        : status === 'denied'
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg capitalize">{getPermissionLabel(type)}</h3>
                    <p className="text-sm text-gray-600">
                      {getStatusLabel(status, permission.message)}
                    </p>
                  </div>
                </div>
                {getStatusIcon(status)}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleRequestPermissions}
            disabled={isRequesting || allGranted}
            className={`flex-1 py-4 px-6 rounded-2xl text-lg font-semibold transition-all ${
              isRequesting || allGranted
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-500 text-white hover:bg-purple-600 hover:scale-105'
            }`}
          >
            {isRequesting ? t.requesting : allGranted ? t.permissionsGranted : t.requestPermissions}
          </button>
          
          {onSkip && (
            <button
              onClick={() => onComplete(hasAnyGranted)}
              className="py-4 px-6 rounded-2xl text-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
            >
              {hasAnyGranted ? t.continue : t.skipForNow}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

