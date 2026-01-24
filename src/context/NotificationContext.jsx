import React, { createContext, useContext, useState, useCallback } from 'react';
import NotificationContainer from '../components/Notification';
import ConfirmDialog from '../components/ConfirmDialog';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null,
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    type: 'warning'
  });

  const showNotification = useCallback((type, message, duration = 5000) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message, duration }]);
  }, []);

  const showSuccess = useCallback((message, duration) => {
    showNotification('success', message, duration);
  }, [showNotification]);

  const showError = useCallback((message, duration) => {
    showNotification('error', message, duration);
  }, [showNotification]);

  const showWarning = useCallback((message, duration) => {
    showNotification('warning', message, duration);
  }, [showNotification]);

  const showInfo = useCallback((message, duration) => {
    showNotification('info', message, duration);
  }, [showNotification]);

  const closeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  const showConfirm = useCallback((options) => {
    return new Promise((resolve) => {
      setConfirmDialog({
        isOpen: true,
        title: options.title || 'Confirm Action',
        message: options.message,
        confirmText: options.confirmText || 'Confirm',
        cancelText: options.cancelText || 'Cancel',
        type: options.type || 'warning',
        onConfirm: () => {
          setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
          resolve(true);
        },
        onCancel: () => {
          setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
          resolve(false);
        }
      });
    });
  }, []);

  const value = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer notifications={notifications} onClose={closeNotification} />
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={confirmDialog.onCancel}
        confirmText={confirmDialog.confirmText}
        cancelText={confirmDialog.cancelText}
        type={confirmDialog.type}
      />
    </NotificationContext.Provider>
  );
};
