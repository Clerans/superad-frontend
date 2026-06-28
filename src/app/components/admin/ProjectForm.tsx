import { useEffect, useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, FileText, LayoutGrid, Info } from 'lucide-react';
import { toast } from 'sonner';
import { SERVICE_CATEGORIES, Project } from '@/types/portfolio';
import { portfolioApi } from '@/api/portfolioApi';
import ImageUploader from './ImageUploader';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Button } from '@/app/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';

export default function ProjectForm() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(isEditMode);
  const [saving, setSaving] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: '',
    },
  });

  const fetchProjectDetails = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await portfolioApi.getProject(id);
      setProject(data);
      reset({
        title: data.title,
        description: data.description || '',
        category: data.category,
      });
    } catch (err: any) {
      toast.error(err.message || 'Failed to load project details');
      navigate('/admin/projects');
    } finally {
      setLoading(false);
    }
  }, [id, reset, navigate]);

  useEffect(() => {
    if (isEditMode) {
      fetchProjectDetails();
    }
  }, [id, isEditMode, fetchProjectDetails]);

  const onSubmit = async (formData: any) => {
    setSaving(true);
    const toastId = toast.loading(isEditMode ? 'Saving project...' : 'Creating project...');
    try {
      if (isEditMode && id) {
        const updated = await portfolioApi.updateProject(id, formData);
        setProject(updated);
        toast.success('Project updated successfully', { id: toastId });
        navigate('/admin/projects');
      } else {
        const created = await portfolioApi.createProject(formData);
        toast.success('Project created! Please upload images now.', { id: toastId });
        // Redirect to edit mode of the newly created project to upload images
        navigate(`/admin/projects/${created.id}/edit`);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to save project', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-secondary font-bold">Loading project data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/projects"
          className="flex items-center gap-2 text-secondary hover:text-primary font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
        <h1 className="text-2xl font-black text-secondary">
          {isEditMode ? 'Edit Project' : 'Add New Project'}
        </h1>
      </div>

      {/* Main Details Form */}
      <div className="bg-white border-4 border-primary/20 rounded-2xl p-8 shadow-md">
        <div className="flex items-center gap-2 border-b-2 border-accent/25 pb-4 mb-6">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-secondary">Project Details</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="font-semibold text-secondary">
                Project Title <span className="text-primary">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g. LED Signboard - Commercial Bank"
                className={`border-2 ${errors.title ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-primary`}
                {...register('title', {
                  required: 'Title is required',
                  maxLength: { value: 255, message: 'Max length is 255 characters' },
                })}
              />
              {errors.title && (
                <p className="text-xs font-semibold text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <Label htmlFor="category" className="font-semibold text-secondary">
                Service Category <span className="text-primary">*</span>
              </Label>
              <Controller
                name="category"
                control={control}
                rules={{ required: 'Category is required' }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      id="category"
                      className={`border-2 ${errors.category ? 'border-red-500' : 'border-gray-200'} rounded-xl h-10`}
                    >
                      <SelectValue placeholder="Select a service category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-gray-200 rounded-xl shadow-lg">
                      {SERVICE_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat} className="hover:bg-accent/10">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-xs font-semibold text-red-500">{errors.category.message}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="font-semibold text-secondary">
              Project Description
            </Label>
            <Textarea
              id="description"
              placeholder="Provide a detailed description of the work done, dimensions, materials, client specifications, etc."
              rows={5}
              className="border-2 border-gray-200 rounded-xl focus:border-primary"
              {...register('description')}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-4 border-t-2 border-accent/25">
            <Button
              type="submit"
              disabled={saving}
              className="bg-primary hover:bg-secondary text-white font-bold px-8 py-3 rounded-xl border-2 border-primary hover:border-secondary transition-all cursor-pointer flex items-center gap-2 shadow-md"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {isEditMode ? 'Save Changes' : 'Create & Continue'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Image Uploading Section (Only shown in Edit mode when project ID is present) */}
      {isEditMode && project && (
        <div className="bg-white border-4 border-primary/20 rounded-2xl p-8 shadow-md">
          <div className="flex items-center gap-2 border-b-2 border-accent/25 pb-4 mb-6">
            <LayoutGrid className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-secondary">Project Images</h2>
          </div>
          <ImageUploader
            projectId={project.id}
            existingImages={project.images}
            onImagesChange={fetchProjectDetails}
          />
        </div>
      )}

      {/* Helper prompt in create mode */}
      {!isEditMode && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-left">
            <h4 className="font-bold text-blue-950 text-sm">Image Upload Notice</h4>
            <p className="text-xs text-blue-700 font-medium">
              You will be able to upload multiple high-resolution images to this project in the next step immediately after creation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
